/**
 * Meta Lead Ads webhook.
 *
 * GET  -> verification handshake when you subscribe the webhook in the Meta App.
 * POST -> called by Meta every time someone submits an Instant Form.
 *         We fetch the lead's answers from the Graph API and push a
 *         notification to Luka's phone (ntfy) and, optionally, email (Resend).
 *
 * Environment variables (set them in the hosting dashboard, e.g. Cloudflare -> Workers & Pages -> project -> Settings -> Variables and Secrets):
 *   META_VERIFY_TOKEN   any secret string you also type into the Meta App webhook setup
 *   META_APP_SECRET     Meta App -> Settings -> Basic -> App secret (used to verify requests)
 *   META_PAGE_TOKEN     long-lived Page access token for the Tintara Smart page
 *   META_GRAPH_VERSION  optional, e.g. "v23.0"
 *   NTFY_TOPIC          secret topic name you subscribe to in the ntfy iPhone app
 *   RESEND_API_KEY      optional, for email notifications
 *   LEAD_EMAIL_TO       optional, where to send the email (e.g. info@tintarasmart.com)
 */

export const dynamic = "force-dynamic";

const GRAPH = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION || "v23.0"}`;

type LeadChange = {
  leadgen_id: string;
  form_id?: string;
  ad_id?: string;
  page_id?: string;
  created_time?: number;
};

type Lead = {
  name: string;
  phone: string;
  email: string;
  adName?: string;
  campaignName?: string;
  platform?: string;
  extra: string[];
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token && token === process.env.META_VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const raw = await request.text();

  if (!(await isValidSignature(raw, request.headers.get("x-hub-signature-256")))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let body: { entry?: { changes?: { field?: string; value?: LeadChange }[] }[] };
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const changes: LeadChange[] = [];
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field === "leadgen" && change.value?.leadgen_id) changes.push(change.value);
    }
  }

  // Handle every lead; never let one failure stop the others, and always answer 200
  // so Meta does not keep retrying and eventually disable the webhook.
  await Promise.allSettled(changes.map(handleLead));

  return new Response("OK", { status: 200 });
}

async function handleLead(change: LeadChange) {
  let lead: Lead | null = null;
  try {
    lead = await fetchLead(change.leadgen_id);
  } catch (err) {
    console.error("Could not fetch lead", change.leadgen_id, err);
  }

  const title = lead ? `Novi lead: ${lead.name || "bez imena"}` : "Novi lead stigao";
  const lines = lead
    ? [
        lead.phone && `Tel: ${lead.phone}`,
        lead.email && `Email: ${lead.email}`,
        lead.adName && `Reklama: ${lead.adName}${lead.platform ? ` (${lead.platform})` : ""}`,
        ...lead.extra,
      ].filter(Boolean)
    : [`Lead ID: ${change.leadgen_id}`, "Otvori Meta Business Suite > Leads Center"];
  const text = lines.join("\n");

  console.log("Meta lead:", title, text.replace(/\n/g, " | "));

  await Promise.allSettled([
    sendNtfy(title, text, lead?.phone),
    sendEmail(title, text),
  ]);
}

async function fetchLead(leadgenId: string): Promise<Lead> {
  const token = process.env.META_PAGE_TOKEN;
  if (!token) throw new Error("META_PAGE_TOKEN missing");

  const fields = "created_time,field_data,ad_name,campaign_name,platform,form_id";
  const res = await fetch(`${GRAPH}/${leadgenId}?fields=${fields}&access_token=${encodeURIComponent(token)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Graph API ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as {
    field_data?: { name: string; values: string[] }[];
    ad_name?: string;
    campaign_name?: string;
    platform?: string;
  };

  const lead: Lead = { name: "", phone: "", email: "", extra: [] };
  for (const f of data.field_data ?? []) {
    const value = (f.values ?? []).join(", ");
    const key = f.name.toLowerCase();
    if (key === "full_name" || key === "name") lead.name = value;
    else if (key.includes("phone")) lead.phone = value;
    else if (key.includes("email")) lead.email = value;
    else lead.extra.push(`${f.name}: ${value}`);
  }
  lead.adName = data.ad_name;
  lead.campaignName = data.campaign_name;
  lead.platform = data.platform === "ig" ? "Instagram" : data.platform === "fb" ? "Facebook" : data.platform;
  return lead;
}

async function sendNtfy(title: string, text: string, phone?: string) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;
  const headers: Record<string, string> = {
    Title: asciiHeader(title),
    Priority: "high",
    Tags: "bell",
  };
  const digits = phone?.replace(/[^\d+]/g, "");
  if (digits) headers.Actions = `view, Pozovi, tel:${digits}; view, SMS, sms:${digits}`;
  const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
    method: "POST",
    headers,
    body: text,
  });
  if (!res.ok) console.error("ntfy failed", res.status, await res.text());
}

async function sendEmail(title: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  if (!key || !to) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_EMAIL_FROM || "Tintara Leads <onboarding@resend.dev>",
      to: [to],
      subject: title,
      text,
    }),
  });
  if (!res.ok) console.error("Resend failed", res.status, await res.text());
}

async function isValidSignature(raw: string, header: string | null) {
  const secret = process.env.META_APP_SECRET;
  if (!secret) return true; // allow first setup before the secret is configured
  if (!header?.startsWith("sha256=")) return false;
  // Web Crypto works on Node, Vercel and Cloudflare alike.
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(raw)));
  const expected = Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
  const received = header.slice("sha256=".length);
  if (expected.length !== received.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ received.charCodeAt(i);
  return diff === 0;
}

// HTTP headers must be plain ASCII; strip diacritics like č, ć, š, ž, đ.
function asciiHeader(s: string) {
  return s
    .replace(/đ/g, "dj").replace(/Đ/g, "Dj")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^\x20-\x7E]/g, "");
}

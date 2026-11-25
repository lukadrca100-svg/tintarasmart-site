/**
 * Lead notifications shared by the website forms and the Meta webhook.
 *
 *   NTFY_TOPIC       secret topic name you subscribe to in the ntfy iPhone app
 *   NTFY_TOKEN       access token from your ntfy.sh account (needed on Cloudflare)
 *   RESEND_API_KEY   optional, for email notifications
 *   LEAD_EMAIL_TO    optional, where to send the email (e.g. info@tintarasmart.com)
 *   LEAD_EMAIL_FROM  optional sender, defaults to Resend's onboarding address
 */

export async function sendNtfy(title: string, text: string, phone?: string) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;
  const headers: Record<string, string> = {
    Title: asciiHeader(title),
    Priority: "high",
    Tags: "bell",
  };
  // With a token, ntfy counts messages against your own account instead of the
  // shared Cloudflare IP (which hits the anonymous daily limit).
  const token = process.env.NTFY_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  const digits = phone?.replace(/[^\d+]/g, "");
  if (digits) headers.Actions = `view, Pozovi, tel:${digits}; view, SMS, sms:${digits}`;
  const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
    method: "POST",
    headers,
    body: text,
  });
  if (!res.ok) console.error("ntfy failed", res.status, await res.text());
}

export type Attachment = { filename: string; content: string }; // content = base64

export async function sendEmail(title: string, text: string, attachments: Attachment[] = []) {
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
      ...(attachments.length ? { attachments } : {}),
    }),
  });
  if (!res.ok) console.error("Resend failed", res.status, await res.text());
}

/** Push to phone and email at once; one failing channel never blocks the other. */
export async function notifyLead(
  title: string,
  text: string,
  phone?: string,
  attachments: Attachment[] = []
) {
  await Promise.allSettled([sendNtfy(title, text, phone), sendEmail(title, text, attachments)]);
}

// HTTP headers must be plain ASCII; strip diacritics like č, ć, š, ž, đ.
function asciiHeader(s: string) {
  return s
    .replace(/đ/g, "dj").replace(/Đ/g, "Dj")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^\x20-\x7E]/g, "");
}

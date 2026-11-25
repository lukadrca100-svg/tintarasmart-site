import { NextResponse } from "next/server";
import { notifyLead, type Attachment } from "@/lib/notify";
import { formatPhone, isValidEmail, normalizePhone, sqftOf, type WindowRow } from "@/lib/validate";

export const dynamic = "force-dynamic";

const MAX_PHOTOS = 6;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

/**
 * Handles both website forms:
 *  - the quote form on the home page
 *  - the free demo form on /demo (sends source=demo plus glass, bestTime and windows)
 * Every request is pushed to Luka's email (Resend, with photos attached) and ntfy when configured.
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const name = get("name");
  const phoneDigits = normalizePhone(get("phone"));
  const email = get("email");
  const isDemo = get("source") === "demo";

  if (!name || !phoneDigits) {
    return NextResponse.json({ error: "Please enter your name and a 10-digit phone number." }, { status: 400 });
  }
  if ((email || isDemo) && !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const phone = formatPhone(phoneDigits);
  const propertyType = get("propertyType");
  const windowsText = formatWindows(get("windows"));
  const attachments = await collectPhotos(formData);

  const lines = [
    `Tel: ${phone}`,
    email && `Email: ${email}`,
    get("city") && `Grad: ${get("city")}`,
    propertyType &&
      `Tip: ${propertyType === "commercial" ? "Firma" : propertyType === "residential" ? "Kuca" : propertyType}`,
    get("glass") && `Staklo: ${get("glass")}`,
    get("windowCount") && `Broj prozora: ${get("windowCount")}`,
    get("bestTime") && `Najbolje vrijeme: ${get("bestTime")}`,
    get("message") && `Poruka: ${get("message")}`,
    windowsText && `\nMjere stakla:\n${windowsText}`,
    attachments.length > 0 && `\nSlike: ${attachments.length} (u prilogu)`,
    `\nIzvor: ${isDemo ? "Landing page /demo" : "Sajt, quote forma"}`,
  ].filter(Boolean) as string[];

  const title = isDemo ? `Besplatni demo: ${name}` : `Novi upit sa sajta: ${name}`;
  const text = lines.join("\n");

  console.log("Website lead:", title, text.replace(/\n/g, " | "));
  await notifyLead(title, text, phoneDigits, attachments);

  return NextResponse.json({ ok: true });
}

function formatWindows(raw: string): string {
  if (!raw) return "";
  let rows: WindowRow[];
  try {
    rows = JSON.parse(raw);
  } catch {
    return "";
  }
  if (!Array.isArray(rows)) return "";
  const clean = rows
    .map((r) => ({
      label: String(r?.label ?? "").slice(0, 60),
      width: Number(r?.width) || 0,
      height: Number(r?.height) || 0,
      qty: Math.max(1, Math.round(Number(r?.qty) || 1)),
    }))
    .filter((r) => r.width > 0 && r.height > 0)
    .slice(0, 30);
  if (!clean.length) return "";

  const out = clean.map((r, i) => {
    const sq = Math.round(sqftOf(r) * 10) / 10;
    const cm = `${Math.round(r.width * 2.54)} x ${Math.round(r.height * 2.54)} cm`;
    return `${i + 1}. ${r.label || `Prozor ${i + 1}`}: ${r.width}" x ${r.height}" (${cm}) x ${r.qty} kom = ${sq} sq ft`;
  });
  const total = Math.round(clean.reduce((s, r) => s + sqftOf(r), 0) * 10) / 10;
  const panels = clean.reduce((s, r) => s + r.qty, 0);
  out.push(`Ukupno: ${panels} kom, ${total} sq ft`);
  return out.join("\n");
}

async function collectPhotos(formData: FormData): Promise<Attachment[]> {
  const files = Array.from(formData.entries())
    .filter(([key, v]) => key.startsWith("photo-") && v instanceof File && v.size > 0)
    .map(([, v]) => v as File)
    .slice(0, MAX_PHOTOS);

  const out: Attachment[] = [];
  for (const [i, file] of files.entries()) {
    if (file.size > MAX_PHOTO_BYTES) continue;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    out.push({ filename: `slika-${i + 1}.${ext}`, content: toBase64(bytes) });
  }
  return out;
}

function toBase64(bytes: Uint8Array) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

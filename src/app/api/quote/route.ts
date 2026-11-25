import { NextResponse } from "next/server";
import { notifyLead } from "@/lib/notify";

export const dynamic = "force-dynamic";

/**
 * Handles both website forms:
 *  - the quote form on the home page
 *  - the free demo form on /demo (sends source=demo plus glass and bestTime)
 * Every request is pushed to Luka's phone (ntfy) and email (Resend) when configured.
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const name = get("name");
  const phone = get("phone");
  const email = get("email");
  const isDemo = get("source") === "demo";

  if (!name || !phone || (!email && !isDemo)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const photoCount = Array.from(formData.keys()).filter((k) => k.startsWith("photo-")).length;
  const propertyType = get("propertyType");

  const lines = [
    `Tel: ${phone}`,
    email && `Email: ${email}`,
    get("city") && `Grad: ${get("city")}`,
    propertyType && `Tip: ${propertyType === "commercial" ? "Firma" : propertyType === "residential" ? "Kuca" : propertyType}`,
    get("glass") && `Staklo: ${get("glass")}`,
    get("windowCount") && `Broj prozora: ${get("windowCount")}`,
    get("bestTime") && `Najbolje vrijeme: ${get("bestTime")}`,
    get("message") && `Poruka: ${get("message")}`,
    photoCount > 0 && `Slike: ${photoCount} (nisu prilozene, pitaj klijenta da ih posalje)`,
    `Izvor: ${isDemo ? "Landing page /demo" : "Sajt, quote forma"}`,
  ].filter(Boolean) as string[];

  const title = isDemo ? `Besplatni demo: ${name}` : `Novi upit sa sajta: ${name}`;
  const text = lines.join("\n");

  console.log("Website lead:", title, text.replace(/\n/g, " | "));
  await notifyLead(title, text, phone);

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");

  if (!name || !phone || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: wire up real delivery (email service, CRM, etc.) once a provider
  // and API key are chosen. For now this just confirms receipt.
  console.log("New quote request:", {
    name,
    phone,
    email,
    city: formData.get("city"),
    propertyType: formData.get("propertyType"),
    windowCount: formData.get("windowCount"),
    message: formData.get("message"),
    photoCount: Array.from(formData.keys()).filter((k) => k.startsWith("photo-")).length,
  });

  return NextResponse.json({ ok: true });
}

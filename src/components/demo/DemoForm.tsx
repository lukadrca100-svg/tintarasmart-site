"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { CheckCircle2, ImagePlus, Phone, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/constants";
import { PRICING, estimate, isValidEmail, normalizePhone, sqftOf, type WindowRow } from "@/lib/validate";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const glassOptions = [
  "Bathroom / shower window",
  "Front door glass",
  "Sliding / patio door",
  "Bedroom or living room windows",
  "Office or conference room glass",
  "Something else",
];

const timeOptions = ["Weekday morning", "Weekday afternoon", "Weekday evening", "Saturday"];

const MAX_PHOTOS = 5;

const fieldClasses =
  "w-full rounded-[3px] border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-dim focus:border-accent";

function Label({ children, htmlFor }: { children: string; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.65rem] uppercase tracking-[0.14em] text-muted-dim"
    >
      {children}
    </label>
  );
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-red-400">{children}</p>;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        "rounded-[3px] border px-3 py-2.5 text-left text-sm transition-colors",
        active
          ? "border-accent bg-accent/10 text-foreground"
          : "border-border-strong text-muted hover:border-accent/40"
      )}
    >
      {children}
    </button>
  );
}

/** Shrinks a phone photo to at most 1280px and ~150 KB so uploads stay fast. */
async function shrinkImage(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.72));
    if (!blob) return file;
    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

const emptyRow = (): WindowRow => ({ label: "", width: 0, height: 0, qty: 1 });

export function DemoForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [glass, setGlass] = useState<string[]>([]);
  const [bestTime, setBestTime] = useState("");
  const [rows, setRows] = useState<WindowRow[]>([emptyRow()]);
  const [zones, setZones] = useState(1);
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [errors, setErrors] = useState<{ name?: string; city?: string; phone?: string; email?: string }>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  const toggleGlass = (option: string) =>
    setGlass((prev) => (prev.includes(option) ? prev.filter((g) => g !== option) : [...prev, option]));

  const updateRow = (i: number, patch: Partial<WindowRow>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const filledRows = rows.filter((r) => r.width > 0 && r.height > 0);
  const totalSqft = Math.round(filledRows.reduce((s, r) => s + sqftOf(r), 0) * 10) / 10;
  const totalPanels = filledRows.reduce((s, r) => s + Math.max(1, r.qty), 0);
  const maxZones = Math.max(1, totalPanels);
  const zoneCount = Math.min(Math.max(1, zones), maxZones);
  const price = totalSqft > 0 ? estimate(totalSqft, zoneCount) : null;

  const addPhotos = async (files: FileList | null) => {
    if (!files) return;
    const room = MAX_PHOTOS - photos.length;
    const picked = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, room);
    const shrunk = await Promise.all(picked.map(shrinkImage));
    setPhotos((prev) => [...prev, ...shrunk.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
  };

  const removePhoto = (i: number) =>
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, idx) => idx !== i);
    });

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!city.trim()) next.city = "Please enter your city.";
    if (!normalizePhone(phone)) next.phone = "Enter a 10-digit phone number, like (708) 555-1234.";
    if (!isValidEmail(email)) next.email = "Enter a valid email, like jane@gmail.com.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("source", "demo");
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("city", city);
      formData.append("propertyType", propertyType);
      formData.append("glass", glass.join(", "));
      formData.append("bestTime", bestTime);
      formData.append("zones", String(zoneCount));
      formData.append(
        "windows",
        JSON.stringify(filledRows.map((r) => ({ ...r, qty: Math.max(1, r.qty) })))
      );
      photos.forEach((p, i) => formData.append(`photo-${i}`, p.file));

      const res = await fetch("/api/quote", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Request failed");
      window.fbq?.("track", "Lead", { content_name: "Free demo" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-[3px] border border-border-strong bg-background-elevated p-8 text-center sm:p-10">
        <CheckCircle2 size={40} className="mx-auto text-accent-strong" />
        <h3 className="mt-6 font-display text-3xl text-foreground">You&apos;re booked in.</h3>
        <p className="mx-auto mt-4 max-w-sm text-muted">
          Luka will call or text you within 24 hours to pick a time for your free demo.
          Can&apos;t wait? Call us now.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href={business.phoneHref} variant="secondary">
            <Phone size={15} /> {business.phone}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-[3px] border border-border-strong bg-background-elevated p-6 sm:p-8"
    >
      <div>
        <Label>This is for my</Label>
        <div className="grid grid-cols-2 gap-3">
          <Chip active={propertyType === "residential"} onClick={() => setPropertyType("residential")}>
            Home
          </Chip>
          <Chip active={propertyType === "commercial"} onClick={() => setPropertyType("commercial")}>
            Business
          </Chip>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="demo-name">Name</Label>
          <input
            id="demo-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={clsx(fieldClasses, errors.name ? "border-red-400" : "border-border-strong")}
            placeholder="Jane Smith"
          />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="demo-phone">Phone</Label>
          <input
            id="demo-phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
            }}
            onBlur={() =>
              phone && !normalizePhone(phone) &&
              setErrors((p) => ({ ...p, phone: "Enter a 10-digit phone number, like (708) 555-1234." }))
            }
            aria-invalid={!!errors.phone}
            className={clsx(fieldClasses, errors.phone ? "border-red-400" : "border-border-strong")}
            placeholder="(555) 123-4567"
          />
          <FieldError>{errors.phone}</FieldError>
        </div>
        <div>
          <Label htmlFor="demo-city">City</Label>
          <input
            id="demo-city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={clsx(fieldClasses, errors.city ? "border-red-400" : "border-border-strong")}
            placeholder="Your city"
          />
          <FieldError>{errors.city}</FieldError>
        </div>
        <div>
          <Label htmlFor="demo-email">Email</Label>
          <input
            id="demo-email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
            }}
            onBlur={() =>
              email && !isValidEmail(email) &&
              setErrors((p) => ({ ...p, email: "Enter a valid email, like jane@gmail.com." }))
            }
            aria-invalid={!!errors.email}
            className={clsx(fieldClasses, errors.email ? "border-red-400" : "border-border-strong")}
            placeholder="jane@gmail.com"
          />
          <FieldError>{errors.email}</FieldError>
        </div>
      </div>

      <div className="mt-5">
        <Label>Which glass? (pick any)</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {glassOptions.map((option) => (
            <Chip key={option} active={glass.includes(option)} onClick={() => toggleGlass(option)}>
              {option}
            </Chip>
          ))}
        </div>
      </div>

      {/* Measurements */}
      <div className="mt-6 rounded-[3px] border border-border p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-dim">
            Instant price
          </div>
          {totalSqft > 0 && (
            <div className="text-xs text-accent-strong">
              {totalPanels} {totalPanels === 1 ? "panel" : "panels"} · {totalSqft} sq ft
            </div>
          )}
        </div>
        <p className="mt-1.5 text-xs text-muted-dim">
          Measure just the glass, in inches, and see your price instantly. We confirm exact sizes at the demo.
        </p>

        <div className="mt-4 space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto] gap-2 sm:grid-cols-[1.4fr_0.7fr_0.7fr_0.5fr_auto]">
              <input
                aria-label={`Window ${i + 1} name`}
                value={row.label}
                onChange={(e) => updateRow(i, { label: e.target.value })}
                placeholder={i === 0 ? "e.g. Front door" : `Window ${i + 1}`}
                className={clsx(fieldClasses, "col-span-2 border-border-strong sm:col-span-1")}
              />
              <div className="col-span-2 grid grid-cols-[1fr_1fr_0.7fr_auto] gap-2 sm:contents">
                {(
                  [
                    ["width", "W in"],
                    ["height", "H in"],
                    ["qty", "Qty"],
                  ] as const
                ).map(([key, ph]) => (
                  <input
                    key={key}
                    aria-label={`Window ${i + 1} ${key}`}
                    type="number"
                    inputMode="decimal"
                    min={key === "qty" ? 1 : 0}
                    value={row[key] || ""}
                    onChange={(e) => updateRow(i, { [key]: Math.max(0, Number(e.target.value) || 0) })}
                    onWheel={(e) => e.currentTarget.blur()}
                    placeholder={ph}
                    className={clsx(
                      fieldClasses,
                      "border-border-strong px-3 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    )}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setRows((prev) => (prev.length === 1 ? [emptyRow()] : prev.filter((_, idx) => idx !== i)))}
                  aria-label={`Remove window ${i + 1}`}
                  className="flex items-center justify-center rounded-[3px] border border-border-strong px-3 text-muted-dim hover:text-foreground"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setRows((prev) => [...prev, emptyRow()])}
          className="mt-3 inline-flex items-center gap-2 text-sm text-accent-strong hover:text-foreground"
        >
          <Plus size={15} /> Add another window
        </button>

        {totalPanels > 0 && (
          <div className="mt-5 border-t border-border pt-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-foreground">Separate switches (zones)</div>
                <p className="mt-0.5 text-xs text-muted-dim">
                  Each zone switches on its own and needs its own transformer (+{usd.format(PRICING.perZone)}).
                </p>
              </div>
              <div className="flex shrink-0 items-center rounded-[3px] border border-border-strong">
                <button
                  type="button"
                  aria-label="Fewer zones"
                  onClick={() => setZones(Math.max(1, zoneCount - 1))}
                  className="px-3 py-2 text-muted hover:text-foreground disabled:opacity-30"
                  disabled={zoneCount <= 1}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm text-foreground" aria-live="polite">{zoneCount}</span>
                <button
                  type="button"
                  aria-label="More zones"
                  onClick={() => setZones(Math.min(maxZones, zoneCount + 1))}
                  className="px-3 py-2 text-muted hover:text-foreground disabled:opacity-30"
                  disabled={zoneCount >= maxZones}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {price && (
          <div className="mt-5 rounded-[3px] bg-accent/10 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.65rem] uppercase tracking-[0.14em] text-accent-strong">Your estimate</span>
              <span className="font-display text-3xl text-foreground">{usd.format(price.total)}</span>
            </div>
            <div className="mt-3 space-y-1 text-xs text-muted">
              <div className="flex justify-between">
                <span>{totalSqft} sq ft × {usd.format(price.rate)}/sq ft, installation included</span>
                <span>{usd.format(price.film)}</span>
              </div>
              <div className="flex justify-between">
                <span>{zoneCount} {zoneCount === 1 ? "transformer" : "transformers"} × {usd.format(PRICING.perZone)}</span>
                <span>{usd.format(price.transformers)}</span>
              </div>
            </div>
            <p className="mt-3 text-[0.7rem] leading-relaxed text-muted-dim">
              {price.rate === PRICING.base
                ? `Over 50 sq ft drops to ${usd.format(PRICING.over50)}/sq ft, over 100 sq ft to ${usd.format(PRICING.over100)}/sq ft. `
                : price.rate === PRICING.over50
                  ? `Over 100 sq ft drops to ${usd.format(PRICING.over100)}/sq ft. `
                  : ""}
              Plus sales tax. Final price confirmed after we measure at your free demo.
            </p>
          </div>
        )}
      </div>

      {/* Photos */}
      <div className="mt-5">
        <Label htmlFor="demo-photos">Photos of your glass (optional)</Label>
        <div className="flex flex-wrap gap-3">
          {photos.map((p, i) => (
            <div key={p.url} className="relative h-20 w-20 overflow-hidden rounded-[3px] border border-border-strong">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                aria-label="Remove photo"
                className="absolute right-1 top-1 rounded-full bg-background/80 p-0.5 text-foreground"
              >
                <X size={13} />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label
              htmlFor="demo-photos"
              className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-[3px] border border-dashed border-border-strong text-muted-dim hover:border-accent/50 hover:text-foreground"
            >
              <ImagePlus size={18} />
              <span className="text-[0.6rem] uppercase tracking-[0.1em]">Add</span>
              <input
                id="demo-photos"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  addPhotos(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
        <p className="mt-2 text-xs text-muted-dim">Up to {MAX_PHOTOS} photos. Helps us bring the right samples.</p>
      </div>

      <div className="mt-6">
        <Label>Best time for the demo</Label>
        <div className="grid grid-cols-2 gap-2">
          {timeOptions.map((option) => (
            <Chip key={option} active={bestTime === option} onClick={() => setBestTime(option)}>
              {option}
            </Chip>
          ))}
        </div>
      </div>

      <Button type="submit" variant="primary" className="mt-7 w-full" icon>
        {status === "submitting" ? "Sending..." : price ? "Lock In My Price" : "Book My Free Demo"}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-dim">
        {price
          ? "Free in-home demo, no obligation. We confirm your measurements and schedule your install."
          : "Free, no obligation. We only use your info to schedule the visit."}
      </p>

      {status === "error" && (
        <p className="mt-3 text-center text-xs text-muted">
          Something went wrong. Please call or text {business.phone} instead.
        </p>
      )}
    </form>
  );
}

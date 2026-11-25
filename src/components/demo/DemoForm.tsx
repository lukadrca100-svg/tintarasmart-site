"use client";

import { useState } from "react";
import clsx from "clsx";
import { CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { business } from "@/lib/constants";

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

const fieldClasses =
  "w-full rounded-[3px] border border-border-strong bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-dim focus:border-accent";

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

export function DemoForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [glass, setGlass] = useState<string[]>([]);
  const [bestTime, setBestTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const toggleGlass = (option: string) =>
    setGlass((prev) => (prev.includes(option) ? prev.filter((g) => g !== option) : [...prev, option]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            className={fieldClasses}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <Label htmlFor="demo-phone">Phone</Label>
          <input
            id="demo-phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClasses}
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <Label htmlFor="demo-city">City</Label>
          <input
            id="demo-city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={fieldClasses}
            placeholder="Your city"
          />
        </div>
        <div>
          <Label htmlFor="demo-email">Email (optional)</Label>
          <input
            id="demo-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClasses}
            placeholder="jane@email.com"
          />
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

      <div className="mt-5">
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
        {status === "submitting" ? "Sending..." : "Book My Free Demo"}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-dim">
        Free, no obligation. We only use your number to schedule the visit.
      </p>

      {status === "error" && (
        <p className="mt-3 text-center text-xs text-muted">
          Something went wrong. Please call or text {business.phone} instead.
        </p>
      )}
    </form>
  );
}

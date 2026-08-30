"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, ImagePlus, X, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { business, pricingTiers } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-[3px] border border-border-strong bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-dim focus:border-accent";

function Label({ children, htmlFor }: { children: string; htmlFor: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.65rem] uppercase tracking-[0.14em] text-muted-dim"
    >
      {children}
    </label>
  );
}

export function Contact() {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState<"" | "residential" | "commercial">("");
  const [windowCount, setWindowCount] = useState("");
  const [message, setMessage] = useState(() => {
    const sqft = searchParams.get("sqft");
    const option = searchParams.get("option");
    const tier = pricingTiers.find((t) => t.id === option);
    const parts: string[] = [];
    if (sqft) parts.push(`Estimated area: ${sqft} sq ft`);
    if (tier) parts.push(`Interested in: ${tier.label} (${tier.subtitle})`);
    return parts.join("\n");
  });
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const additions = Array.from(fileList).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...additions]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyType) return;

    setStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("city", city);
      formData.append("propertyType", propertyType);
      formData.append("windowCount", windowCount);
      formData.append("message", message);
      photos.forEach((p, i) => formData.append(`photo-${i}`, p.file));

      const res = await fetch("/api/quote", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="relative border-t border-border py-28 lg:py-36">
        <Container className="max-w-xl text-center">
          <CheckCircle2 size={40} className="mx-auto text-accent-strong" />
          <h2 className="mt-6 font-display text-3xl text-foreground">
            Thanks — your request is in.
          </h2>
          <p className="mt-4 text-muted">
            We&apos;ll be in touch shortly. In the meantime, feel free to call
            or email us directly.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href={business.phoneHref} variant="secondary">
              <Phone size={15} /> {business.phone}
            </Button>
            <Button href={`mailto:${business.email}`} variant="secondary">
              <Mail size={15} /> {business.email}
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="contact" className="relative border-t border-border py-28 lg:py-36">
      <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <SectionHeading
            kicker="Get a Quote"
            title={
              <>
                Let&apos;s talk about
                <br />
                <span className="italic text-accent-strong">your space.</span>
              </>
            }
            description="Tell us a bit about your project and we'll follow up with next steps — no obligation."
          />

          <div className="mt-10 space-y-4">
            <a
              href={business.phoneHref}
              className="flex items-center gap-3 text-sm text-muted hover:text-foreground"
            >
              <Phone size={16} className="text-accent-strong" />
              {business.phone}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-3 text-sm text-muted hover:text-foreground"
            >
              <Mail size={16} className="text-accent-strong" />
              {business.email}
            </a>
            <div className="flex items-center gap-3 text-sm text-muted">
              <Clock size={16} className="text-accent-strong" />
              {business.hours}
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="rounded-[3px] border border-border-strong bg-background-elevated p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClasses}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClasses}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClasses}
                placeholder="jane@email.com"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <input
                id="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={fieldClasses}
                placeholder="Your city"
              />
            </div>
          </div>

          <div className="mt-5">
            <Label htmlFor="propertyType">Property Type</Label>
            <div id="propertyType" className="grid grid-cols-2 gap-3">
              {(["residential", "commercial"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPropertyType(option)}
                  className={`rounded-[3px] border px-4 py-3 text-sm capitalize transition-colors ${
                    propertyType === option
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border-strong text-muted hover:border-border-strong/70"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <Label htmlFor="windowCount">Approximate Number of Windows</Label>
            <input
              id="windowCount"
              type="number"
              min={0}
              value={windowCount}
              onChange={(e) => setWindowCount(e.target.value)}
              className={fieldClasses}
              placeholder="e.g. 4"
            />
          </div>

          <div className="mt-5">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClasses} resize-none`}
              placeholder="Tell us about your project..."
            />
          </div>

          <div className="mt-5">
            <Label htmlFor="photos">Photos of Your Windows (optional)</Label>
            <label
              htmlFor="photos"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[3px] border border-dashed border-border-strong px-4 py-6 text-muted-dim transition-colors hover:border-accent/50"
            >
              <ImagePlus size={20} />
              <span className="text-xs">Tap to upload photos</span>
              <input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>

            {photos.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {photos.map((p, i) => (
                  <div
                    key={p.url}
                    className="relative aspect-square overflow-hidden rounded-[3px] border border-border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- local blob: preview, not an optimizable asset */}
                    <img
                      src={p.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label="Remove photo"
                      className="absolute right-1 top-1 rounded-full bg-background/80 p-1 text-foreground"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="mt-7 w-full"
            icon
          >
            {status === "submitting" ? "Sending..." : "Get My Free Quote"}
          </Button>

          {status === "error" && (
            <p className="mt-3 text-center text-xs text-muted">
              Something went wrong. Please call or email us directly instead.
            </p>
          )}
        </motion.form>
      </Container>
    </section>
  );
}

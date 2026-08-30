"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedPrice } from "@/components/ui/AnimatedPrice";
import { pricingTiers } from "@/lib/constants";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function useNumberField(initial: number, min: number) {
  const [value, setValue] = useState(initial);
  const onChange = (raw: string) => {
    if (raw === "") {
      setValue(0);
      return;
    }
    const n = Number(raw);
    if (Number.isNaN(n) || n < 0) return;
    setValue(n);
  };
  const clamped = Math.max(min, value);
  return { value, clamped, onChange };
}

function DimensionField({
  id,
  label,
  suffix,
  value,
  onChange,
}: {
  id: string;
  label: string;
  suffix: string;
  value: number;
  onChange: (raw: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-[3px] border border-border bg-background/60 px-3 py-4">
      <label
        htmlFor={id}
        className="text-[0.6rem] uppercase tracking-[0.14em] text-muted-dim"
      >
        {label}
      </label>
      <div className="flex items-baseline gap-1">
        <input
          id={id}
          type="number"
          min={0}
          value={value === 0 ? "" : value}
          placeholder="0"
          onChange={(e) => onChange(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
          className="w-12 bg-transparent text-center font-display text-2xl text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="text-xs text-muted-dim">{suffix}</span>
      </div>
    </div>
  );
}

export function Pricing() {
  const router = useRouter();
  const pathname = usePathname();

  const width = useNumberField(5, 0);
  const height = useNumberField(6, 0);
  const qty = useNumberField(1, 1);

  const [selectedTier, setSelectedTier] = useState<string>("pro");

  const perWindow = width.clamped * height.clamped;
  const totalSqft = Math.round(perWindow * qty.clamped * 10) / 10;

  const handleGetQuote = () => {
    const params = new URLSearchParams({
      sqft: String(totalSqft),
      option: selectedTier,
    });
    router.push(`${pathname}?${params.toString()}#contact`, { scroll: false });
    requestAnimationFrame(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <section id="pricing" className="relative border-t border-border py-28 lg:py-36">
      <Container>
        <SectionHeading
          kicker="Pricing"
          align="center"
          title={
            <>
              Three ways to
              <br />
              <span className="italic text-accent-strong">switch your glass.</span>
            </>
          }
          description="Every project is measured and quoted precisely — but here's a quick estimate for your own window."
          className="mx-auto"
        />

        {/* Compact window calculator */}
        <div className="mx-auto mt-16 max-w-xl rounded-[3px] border border-border-strong bg-background-elevated p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-3">
            <DimensionField
              id="width"
              label="Width"
              suffix="ft"
              value={width.value}
              onChange={width.onChange}
            />
            <DimensionField
              id="height"
              label="Height"
              suffix="ft"
              value={height.value}
              onChange={height.onChange}
            />
            <DimensionField
              id="qty"
              label="Quantity"
              suffix="win."
              value={qty.value}
              onChange={qty.onChange}
            />
          </div>

          <div className="mt-5 text-center text-sm text-muted">
            {width.clamped || "–"} ft × {height.clamped || "–"} ft ×{" "}
            {qty.clamped} ={" "}
            <span className="font-display italic text-accent-strong">
              {totalSqft} sq. ft.
            </span>{" "}
            total
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2.5">
            {pricingTiers.map((tier) => {
              const total = Math.round(totalSqft * tier.pricePerSqFt);
              const selected = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  className={`rounded-[3px] border px-2 py-3 text-center transition-colors ${
                    selected
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-border-strong"
                  }`}
                >
                  <div className="text-[0.6rem] uppercase tracking-[0.1em] text-muted-dim">
                    {tier.label}
                  </div>
                  <div className="mt-1 font-display text-lg text-foreground">
                    {currency.format(total)}
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            onClick={handleGetQuote}
            variant="primary"
            className="mt-7 w-full"
          >
            Get My Quote
          </Button>

          <p className="mt-4 text-center text-[0.7rem] leading-relaxed text-muted-dim">
            Estimate only — final pricing may vary after measurements and
            project review.
          </p>
        </div>

        {/* Detailed pricing cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-border lg:rounded-[3px] lg:border lg:border-border">
          {pricingTiers.map((tier, i) => {
            const total = Math.round(totalSqft * tier.pricePerSqFt);
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex flex-col rounded-[3px] border p-9 lg:rounded-none lg:border-0 ${
                  tier.featured
                    ? "border-accent/50 bg-background-elevated"
                    : "border-border bg-background-elevated lg:bg-transparent"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-9 rounded-[3px] bg-gradient-to-b from-accent-strong to-accent px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-accent-contrast">
                    Most Popular
                  </div>
                )}

                <div className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-dim">
                  {tier.subtitle}
                </div>
                <div className="mt-3 font-display text-2xl text-foreground">
                  {tier.label}
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-3xl italic text-accent-strong">
                    ${tier.pricePerSqFt}
                  </span>
                  <span className="text-sm text-muted-dim">/ sq. ft.</span>
                </div>
                {"startingPrice" in tier && tier.startingPrice && (
                  <div className="mt-1 text-[0.65rem] uppercase tracking-wider text-muted-dim">
                    Starting price
                  </div>
                )}

                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-accent-strong"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-[3px] border border-border bg-background/60 px-5 py-4">
                  <div className="text-[0.6rem] uppercase tracking-[0.14em] text-muted-dim">
                    Estimated total
                  </div>
                  <AnimatedPrice
                    value={total}
                    className="font-display text-2xl text-foreground"
                  />
                </div>

                <Button
                  href="#contact"
                  variant={tier.featured ? "primary" : "secondary"}
                  className="mt-7 w-full"
                >
                  {tier.cta}
                </Button>
              </motion.div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-dim">
          Prices shown are estimated based on square footage. Final pricing
          may vary depending on project requirements, measurements,
          installation conditions, and customization.
        </p>
      </Container>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="relative border-t border-border py-28 lg:py-36">
      <Container>
        <SectionHeading
          kicker="Testimonials"
          align="center"
          title={
            <>
              What clients say
              <br />
              <span className="italic text-accent-strong">once it&apos;s installed.</span>
            </>
          }
          className="mx-auto"
        />

        <div className="mt-6 flex justify-center">
          <span className="rounded-[3px] border border-border-strong bg-surface px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted-dim">
            Placeholder quotes — swap in real reviews
          </span>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-[3px] border border-border bg-background-elevated p-8"
            >
              <Quote size={20} className="text-accent-strong" />
              <p className="mt-5 flex-1 text-sm italic leading-relaxed text-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="text-sm text-foreground">{t.name}</div>
                <div className="text-xs text-muted-dim">{t.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

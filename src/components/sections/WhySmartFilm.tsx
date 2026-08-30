"use client";

import { motion } from "framer-motion";
import { Zap, Layers, Smartphone, Sparkles, Sun } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits } from "@/lib/constants";

const icons = { Zap, Layers, Smartphone, Sparkles, Sun };

export function WhySmartFilm() {
  return (
    <section className="relative border-t border-border py-28 lg:py-36">
      <Container>
        <SectionHeading
          kicker="Why Smart Film"
          align="center"
          title={
            <>
              Built for spaces that refuse to
              <br />
              <span className="italic text-accent-strong">choose</span>{" "}
              between light and privacy.
            </>
          }
          className="mx-auto"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-[3px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((b, i) => {
            const Icon = icons[b.icon as keyof typeof icons];
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex flex-col gap-4 bg-background-elevated p-8"
              >
                <Icon size={22} className="text-accent-strong" />
                <div className="font-display text-lg text-foreground">
                  {b.title}
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {b.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

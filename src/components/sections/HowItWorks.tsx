"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-t border-border py-28 lg:py-36">
      <Container>
        <SectionHeading
          kicker="How It Works"
          align="center"
          title={
            <>
              From consultation to
              <br />
              <span className="italic text-accent-strong">instant privacy.</span>
            </>
          }
          className="mx-auto"
        />

        <div className="relative mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="absolute inset-x-0 top-6 hidden h-px bg-border lg:block" />
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-background font-display text-lg italic text-accent-strong">
                {step.number}
              </div>
              <div className="mt-6 font-display text-xl text-foreground">
                {step.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

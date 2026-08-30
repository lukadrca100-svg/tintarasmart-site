"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GlassSwitchDemo } from "@/components/ui/GlassSwitchDemo";
import { business } from "@/lib/constants";

const chips = [
  "Wall Switch, Remote & App Control",
  "Residential & Commercial",
  "Professional Installation",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-40 pb-24 lg:pt-52 lg:pb-32"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12%] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[160px]" />
      </div>

      {/* Oversized watermark word for editorial depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-1/2 -z-10 hidden -translate-x-1/2 select-none whitespace-nowrap font-display text-[13rem] font-light italic text-foreground/[0.025] lg:block xl:text-[16rem]"
      >
        Transparent
      </div>

      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="kicker"
          >
            Smart Film · {business.serviceArea}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-6xl font-normal leading-[0.98] tracking-tight text-balance sm:text-7xl lg:text-[5.25rem]"
          >
            Privacy, at the
            <br />
            <span className="italic text-accent-strong">touch of a button.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-muted"
          >
            {business.name} transforms your existing glass into switchable
            Smart Film — instantly shifting from fully transparent to frosted
            privacy, with no blinds, no curtains, and no compromise on light.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-11 flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <Button href="#contact" variant="primary" icon>
              Get a Free Quote
            </Button>
            <Button href="#how-it-works" variant="link">
              See How It Works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {chips.map((chip, i) => (
              <span key={chip} className="flex items-center gap-6">
                {i > 0 && <span className="h-3 w-px bg-border-strong" />}
                <span className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-dim">
                  {chip}
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassSwitchDemo />
          <p className="mt-4 text-center text-[0.7rem] uppercase tracking-[0.14em] text-muted-dim">
            Illustrative demo — try the switch
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

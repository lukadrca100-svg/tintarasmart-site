"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
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
      className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-1.5 text-xs tracking-wide text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
            Smart Film for {business.serviceArea}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
          >
            Privacy, at the
            <br />
            <span className="italic text-accent-strong">touch of a button.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 max-w-lg text-lg text-muted"
          >
            {business.name} transforms your existing glass into switchable
            Smart Film — instantly shifting from fully transparent to frosted
            privacy, with no blinds, no curtains, and no compromise on light.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href="#contact" variant="primary">
              Get a Free Quote
              <ArrowRight size={16} />
            </Button>
            <Button href="#how-it-works" variant="secondary">
              <PlayCircle size={16} />
              See How It Works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
          >
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-xs uppercase tracking-wider text-muted-dim"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <GlassSwitchDemo />
          <p className="mt-3 text-center text-xs text-muted-dim">
            Illustrative demo — try the switch
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

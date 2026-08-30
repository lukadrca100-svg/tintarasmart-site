"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-20"
    >
      <video
        src="/media/hero-loop.mp4"
        poster="/media/brand-promo-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/40" />

      <Container>
        <div className="max-w-xl">
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
      </Container>
    </section>
  );
}

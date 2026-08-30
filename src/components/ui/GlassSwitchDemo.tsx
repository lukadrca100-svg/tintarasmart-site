"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Abstract, illustrative demonstration of Smart Film switching between its
 * frosted (private / power off) and clear (transparent / power on) states.
 * Built entirely from CSS gradients — not a photo — so it's honest about
 * being a product illustration rather than a real installation photo.
 */
export function GlassSwitchDemo({
  className,
  label = "Living Room — Zone 1",
}: {
  className?: string;
  label?: string;
}) {
  const [clear, setClear] = useState(true);

  return (
    <div className={className}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-border-strong bg-background-elevated shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]">
        {/* Simulated interior — soft light blobs + furniture silhouettes, never claimed as a photo */}
        <div className="absolute inset-0">
          <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-accent/25 blur-[70px]" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent-deep/30 blur-[90px]" />
          <div className="absolute left-1/3 top-1/4 h-40 w-64 rounded-3xl bg-foreground/10 blur-2xl" />
          <div className="absolute bottom-8 left-10 h-24 w-40 rounded-2xl bg-foreground/[0.08] blur-md" />
          <div className="absolute bottom-8 right-16 h-32 w-20 rounded-xl bg-foreground/[0.06] blur-md" />
        </div>

        {/* Window mullion grid, evokes architectural glazing */}
        <div className="absolute inset-6 grid grid-cols-3 grid-rows-2 gap-px sm:inset-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-foreground/[0.07]" />
          ))}
        </div>

        {/* Frost layer — transitions with backdrop-filter + opacity */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            backdropFilter: clear ? "blur(0px)" : "blur(28px)",
            WebkitBackdropFilter: clear ? "blur(0px)" : "blur(28px)",
            backgroundColor: clear
              ? "rgba(245,241,236,0)"
              : "rgba(245,241,236,0.14)",
          }}
        />
        <div
          className="grain-overlay transition-opacity duration-700"
          style={{ opacity: clear ? 0 : 0.08 }}
        />

        {/* Glass sheen sweep, only visible when clear */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: clear ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -inset-y-10 left-[-20%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent" />
        </motion.div>

        {/* State label */}
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-border-strong bg-background/60 px-3 py-1.5 text-xs text-muted backdrop-blur-md">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              clear ? "bg-accent-strong" : "bg-muted-dim"
            }`}
          />
          {label}
        </div>

        {/* Control dock */}
        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 rounded-2xl border border-border-strong bg-background/70 px-4 py-3 backdrop-blur-md sm:inset-x-8 sm:px-5 sm:py-4">
          <div className="text-sm">
            <div className="font-medium text-foreground">
              {clear ? "Clear — Transparent" : "Frosted — Private"}
            </div>
            <div className="text-xs text-muted">Tap to switch states</div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={clear}
            aria-label="Toggle Smart Film demo between clear and frosted"
            onClick={() => setClear((v) => !v)}
            className="relative h-8 w-16 shrink-0 rounded-full border border-border-strong bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className="absolute top-1 h-6 w-6 rounded-full bg-gradient-to-b from-accent-strong to-accent shadow-[0_0_16px_rgba(201,166,107,0.6)]"
              style={{ left: clear ? "calc(100% - 1.75rem)" : "0.25rem" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

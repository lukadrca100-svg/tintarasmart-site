"use client";

import { AnimatePresence, motion } from "framer-motion";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function AnimatedPrice({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex overflow-hidden tabular-nums ${className ?? ""}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {currency.format(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

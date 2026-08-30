"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[160px]" />
      </div>

      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
            Ready to upgrade
            <br />
            <span className="italic text-accent-strong">your glass?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted">
            Get a free consultation and see what Smart Film can do for your
            space.
          </p>
          <div className="mt-10">
            <Button href="#contact" variant="primary" icon>
              Get a Free Quote
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

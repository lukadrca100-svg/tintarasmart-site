"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Building2,
  Palette,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/lib/constants";

const icons = {
  Wrench,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Building2,
  Palette,
};

export function WhyChooseUs() {
  return (
    <section className="relative border-t border-border py-28 lg:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <SectionHeading
            kicker="Why Choose Us"
            title={
              <>
                Built on craft,
                <br />
                <span className="italic text-accent-strong">not shortcuts.</span>
              </>
            }
            description="Smart Film is only as good as its installation. Here's what you can expect working with us."
          />

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {whyChooseUs.map((item, i) => {
              const Icon = icons[item.icon as keyof typeof icons];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Icon size={20} className="text-accent-strong" />
                  <div className="mt-4 font-display text-lg text-foreground">
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

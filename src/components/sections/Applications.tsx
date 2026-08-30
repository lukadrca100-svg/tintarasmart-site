"use client";

import { motion } from "framer-motion";
import {
  Bath,
  BedDouble,
  Sofa,
  Briefcase,
  Users,
  PanelsTopLeft,
  Stethoscope,
  Building2,
  ShoppingBag,
  Store,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { applications } from "@/lib/constants";

const icons = {
  Bath,
  BedDouble,
  Sofa,
  Briefcase,
  Users,
  PanelsTopLeft,
  Stethoscope,
  Building2,
  ShoppingBag,
  Store,
};

function Group({
  label,
  items,
  delayOffset,
}: {
  label: string;
  items: readonly { icon: string; label: string }[];
  delayOffset: number;
}) {
  return (
    <div>
      <div className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-dim">
        {label}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {items.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (delayOffset + i) * 0.05 }}
              className="flex items-center gap-3 rounded-[3px] border border-border bg-background-elevated px-5 py-5 transition-colors hover:border-accent/40"
            >
              <Icon size={18} className="shrink-0 text-accent-strong" />
              <span className="text-sm text-foreground">{item.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function Applications() {
  return (
    <section id="applications" className="relative border-t border-border py-28 lg:py-36">
      <Container>
        <SectionHeading
          kicker="Applications"
          title={
            <>
              Wherever there&apos;s glass,
              <br />
              <span className="italic text-accent-strong">
                there&apos;s an application.
              </span>
            </>
          }
          description="From a single bathroom window to a full floor of conference rooms, Smart Film adapts to residential and commercial spaces alike."
        />

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          <Group label="Residential" items={applications.residential} delayOffset={0} />
          <Group label="Commercial" items={applications.commercial} delayOffset={4} />
        </div>
      </Container>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems } from "@/lib/constants";

export function Gallery() {
  return (
    <section id="our-work" className="relative border-t border-border py-28 lg:py-36">
      <Container>
        <SectionHeading
          kicker="Our Work"
          align="center"
          title={
            <>
              Real installations,
              <br />
              <span className="italic text-accent-strong">not stock photos.</span>
            </>
          }
          description="A growing collection of our completed projects. Every photo here is real work — nothing staged."
          className="mx-auto"
        />

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[3px] border border-border bg-background-elevated"
            >
              {item.type === "photo" ? (
                <>
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 pt-10">
                    <p className="text-xs leading-relaxed text-foreground">
                      {item.caption}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-border-strong text-muted-dim">
                  <ImagePlus size={20} />
                  <span className="text-[0.65rem] uppercase tracking-[0.14em]">
                    Add Photo
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

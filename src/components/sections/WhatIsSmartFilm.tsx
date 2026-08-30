"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatePanel } from "@/components/ui/StatePanel";

export function WhatIsSmartFilm() {
  return (
    <section id="what-is-smart-film" className="relative py-28 lg:py-36">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            kicker="What Is Smart Film"
            title={
              <>
                One film.
                <br />
                <span className="italic text-accent-strong">
                  Two completely different states.
                </span>
              </>
            }
          />
          <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-muted">
            <p>
              Smart Film is a thin layer of PDLC (Polymer Dispersed Liquid
              Crystal) material, applied directly to your existing glass.
              Inside it are millions of microscopic liquid crystals suspended
              in a polymer matrix.
            </p>
            <p>
              Without power, those crystals sit in random orientations —
              scattering light and giving the glass a soft, frosted, fully
              private appearance. Apply a low-voltage current, and the
              crystals align instantly, letting light pass straight through
              for a completely clear, transparent view.
            </p>
            <p>
              No film to peel, no blinds to lower — just a switch, remote, or
              app tap between total privacy and an unobstructed view.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <StatePanel state="off" photo="/media/smart-film-frosted.jpg" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8"
          >
            <StatePanel state="on" photo="/media/smart-film-clear.jpg" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

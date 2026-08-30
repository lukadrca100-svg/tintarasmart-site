import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIsSmartFilm } from "@/components/sections/WhatIsSmartFilm";
import { WhySmartFilm } from "@/components/sections/WhySmartFilm";
import { Applications } from "@/components/sections/Applications";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Gallery } from "@/components/sections/Gallery";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsSmartFilm />
        <WhySmartFilm />
        <Applications />
        <HowItWorks />
        <Pricing />
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

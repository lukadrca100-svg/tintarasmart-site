import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIsSmartFilm } from "@/components/sections/WhatIsSmartFilm";
import { WhySmartFilm } from "@/components/sections/WhySmartFilm";
import { Applications } from "@/components/sections/Applications";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";

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
      </main>
      <Footer />
    </>
  );
}

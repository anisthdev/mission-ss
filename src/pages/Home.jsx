import HeroAlt from "../components/home/HeroAlt";
import Hero from "../components/home/Hero";
import ImpactStats from "../components/home/ImpactStats";
import WhatWeDo from "../components/home/WhatWeDo";
import FeaturedInitiatives from "../components/home/FeaturedInitiatives";
import OdishaMap from "../components/home/OdishaMap";
import PartnersStrip from "../components/home/PartnersStrip";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <HeroAlt /> */}
      <Hero />
      <ImpactStats />
      <WhatWeDo />
      <FeaturedInitiatives />
      <OdishaMap />
      <PartnersStrip />
      <CTASection />
    </div>
  );
}

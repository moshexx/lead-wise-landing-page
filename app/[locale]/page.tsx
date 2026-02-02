import { setRequestLocale } from 'next-intl/server';
import HeroSection, { VideoSection } from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import PromiseSection from '@/components/sections/PromiseSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import WhatYouGetSection from '@/components/sections/WhatYouGetSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import ROICalculatorSection from '@/components/sections/ROICalculatorSection';
import AvailabilitySection from '@/components/sections/AvailabilitySection';
import PricingSection from '@/components/sections/PricingSection';
import RiskReversalSection from '@/components/sections/RiskReversalSection';
import FAQSection from '@/components/sections/FAQSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import Footer from '@/components/sections/Footer';
import StickyFloatingCTA from '@/components/ui/StickyFloatingCTA';

export default function HomePage({ params }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(params.locale);

  return (
    <main>
      {/* Sticky Floating CTA (mobile only) */}
      <StickyFloatingCTA />

      {/* Page Sections (in exact order per spec) */}
      <HeroSection />
      <VideoSection />
      <ProblemSection />
      <PromiseSection />
      <HowItWorksSection />
      <WhatYouGetSection />
      <SocialProofSection />
      <ROICalculatorSection />
      <AvailabilitySection />
      <PricingSection />
      <RiskReversalSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}

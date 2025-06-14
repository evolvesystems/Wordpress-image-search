
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhyItMatters from '@/components/home/WhyItMatters';
import CoreFeatures from '@/components/home/CoreFeatures';
import HowItWorks from '@/components/home/HowItWorks';
import PricingOverview from '@/components/home/PricingOverview';
import RealUseCases from '@/components/home/RealUseCases';
import ClosingCTA from '@/components/home/ClosingCTA';
import ImageAIAssistant from '@/components/ImageAIAssistant';

const Index = () => (
  <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 via-blue-50 to-white relative font-sans">
    <HeroSection />
    <WhyItMatters />
    <CoreFeatures />
    <HowItWorks />
    <PricingOverview />
    <RealUseCases />
    <ClosingCTA />
    {/* Floating AI Chat Assistant Button */}
    <ImageAIAssistant />
  </div>
);

export default Index;


import React from 'react';
import HeaderNav from '@/components/home/HeaderNav';
import HeroSection from '@/components/home/HeroSection';
import WhyItMatters from '@/components/home/WhyItMatters';
import CoreFeatures from '@/components/home/CoreFeatures';
import HowItWorks from '@/components/home/HowItWorks';
import PricingOverview from '@/components/home/PricingOverview';
import RealUseCases from '@/components/home/RealUseCases';
import ClosingCTA from '@/components/home/ClosingCTA';
import SearchInterface from '@/components/SearchInterface';
import ImageAIAssistant from '@/components/ImageAIAssistant';

const Index = () => (
  <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 via-blue-50 to-white relative font-sans">
    <HeaderNav />
    <HeroSection />
    <div id="search">
      <SearchInterface />
    </div>
    <WhyItMatters />
    <CoreFeatures />
    <HowItWorks />
    <PricingOverview />
    <RealUseCases />
    <ClosingCTA />
    {/* Floating green AI Chat Assistant Button (visually contrasting) */}
    <ImageAIAssistant />
  </div>
);

export default Index;

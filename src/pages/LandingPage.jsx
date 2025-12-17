import HeroSection from '../components/landing/HeroSection';
import StatsSection from '../components/landing/StatsSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import CTASection from '../components/landing/CTASection';

/**
 * Landing Page Component
 * Modularized for better maintainability and performance.
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Global Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none" />

      {/* Global Background Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
      <div className="absolute top-[30%] left-0 -ml-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />

      {/* Content wrapper to ensure z-index is above background */}
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </div>
    </div>
  );
};

export default LandingPage;

import HeroSection from '../components/landing/HeroSection';
import StatsSection from '../components/landing/StatsSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import AboutSection from '../components/landing/AboutSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';

/**
 * Landing Page Component
 * Modularized for better maintainability and performance.
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Global Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" />

      {/* Global Background Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
      <div className="absolute top-[30%] left-0 -ml-20 w-80 h-80 bg-primary/10 dark:bg-blue-500/10 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />

      {/* Content wrapper to ensure z-index is above background */}
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <AboutSection />
        <HowItWorksSection />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  );
};

export default LandingPage;

'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';
import LandingHeader from '@/components/LandingHeader';
import Logo from '@/components/Logo';
import SommelierChatPreview from '@/components/SommelierChatPreview';
import PlatformEngines from '@/components/PlatformEngines';
import ComplianceShield from '@/components/ComplianceShield';
import SommelierFeature from '@/components/SommelierFeature';
import PricingSection from '@/components/PricingSection';
import { useComingSoon } from '@/components/ComingSoonProvider';

export default function Landing() {
  const { openComingSoon } = useComingSoon();
  const platformSectionRef = useRef(null);
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    const target = platformSectionRef.current;
    if (!target) return;

    const updateHeader = () => {
      setHeaderSolid(target.getBoundingClientRect().top <= 64);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);

    return () => {
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader
        solid={headerSolid}
        onSignIn={openComingSoon}
        onGetStarted={openComingSoon}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden text-center flex flex-col"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -10%, #8b5cf6 0%, #7c3aed 25%, #6d28d9 50%, #5b21b6 75%, #4c1d95 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 pt-12 pb-10 sm:pt-14 sm:pb-12 md:pt-16 md:pb-14 w-full">
          <AnimateIn immediate animation="slide-up" delay={100}>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6 sm:mb-8 bg-white/10 border border-white/20 text-white backdrop-blur-sm">
              <Sparkles size={12} className="text-white shrink-0" aria-hidden="true" />
              The AI-powered vape shop platform
            </div>
          </AnimateIn>

          <AnimateIn immediate animation="slide-up" delay={180}>
            <h1 className="text-[1.875rem] sm:text-4xl md:text-[2.75rem] lg:text-[3rem] font-extrabold leading-[1.1] mb-5 sm:mb-7 tracking-tight">
              <span className="block text-white">Your AI Flavor Sommelier</span>
              <span className="block text-white/70">Built for vape retail</span>
            </h1>
          </AnimateIn>

          <AnimateIn immediate animation="slide-up" delay={260}>
            <p className="text-white/85 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
              Give every customer a personalized flavor recommendation the moment they walk in — compliant by design, powered by AI, and connected to your live inventory.
            </p>
          </AnimateIn>

          <AnimateIn immediate animation="slide-up" delay={340}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 sm:mb-12">
              <button
                type="button"
                onClick={openComingSoon}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#4c1d95] bg-white hover:bg-white/95 rounded-full transition-colors shadow-md min-w-[180px]"
              >
                Start Free Trial <ArrowRight size={15} aria-hidden="true" />
              </button>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-1.5 px-2 py-3 text-sm font-medium text-white hover:text-white/90 transition-colors"
              >
                <Sparkles size={14} className="shrink-0" aria-hidden="true" />
                Try the Sommelier now
                <ChevronRight size={14} className="shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn immediate animation="slide-up" delay={420} className="mt-2 sm:mt-4">
            <SommelierChatPreview />
          </AnimateIn>
        </div>
      </section>

      {/* Floating action button */}
      <Link
        href="/demo"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Try the Sommelier"
      >
        <Sparkles size={22} aria-hidden="true" />
      </Link>

      <div ref={platformSectionRef}>
        <PlatformEngines />
      </div>

      <ComplianceShield />

      <SommelierFeature />

      <div className="gradient-mesh">

      <PricingSection />

      {/* Footer */}
      <footer className="border-t border-line bg-surface">
        <AnimateIn animation="fade-in" duration={500}>
          <div className="container-app max-w-7xl py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size={28} showText />
            <p className="text-body text-sm">© 2026 VapePass. All rights reserved.</p>
          </div>
        </AnimateIn>
      </footer>
      </div>
    </div>
  );
}

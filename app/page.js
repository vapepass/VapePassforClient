'use client';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';
import Logo from '@/components/Logo';
import SommelierChatPreview from '@/components/SommelierChatPreview';
import PlatformEngines from '@/components/PlatformEngines';
import ComplianceShield from '@/components/ComplianceShield';
import SommelierFeature from '@/components/SommelierFeature';
import PricingSection from '@/components/PricingSection';
import Button from '@/components/ui/Button';
import { useComingSoon } from '@/components/ComingSoonProvider';

export default function Landing() {
  const { openComingSoon } = useComingSoon();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-[#f5f3ff]">
        <nav
          className="flex items-center justify-between px-6 md:px-10 py-4 max-w-7xl mx-auto"
          aria-label="Main navigation"
        >
          <AnimateIn immediate animation="slide-down" duration={400}>
            <Logo size={32} showText icon="sparkles" />
          </AnimateIn>
          <AnimateIn immediate animation="slide-down" delay={80} duration={400} className="flex items-center gap-4 sm:gap-5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#f0ebfd] text-brand-600">
              <Sparkles size={11} aria-hidden="true" />
              Coming Soon
            </span>
            <button
              type="button"
              onClick={openComingSoon}
              className="text-sm font-medium text-ink hover:text-brand-600 transition-colors"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={openComingSoon}
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-colors shadow-sm"
            >
              Get Started
            </button>
          </AnimateIn>
        </nav>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden text-center flex flex-col"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -10%, #8b5cf6 0%, #7c3aed 25%, #6d28d9 50%, #5b21b6 75%, #4c1d95 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-8 sm:pt-12 sm:pb-10 md:pt-14 md:pb-11 w-full">
          <AnimateIn immediate animation="slide-up" delay={100}>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium mb-5 sm:mb-6 bg-white/10 border border-white/20 text-white backdrop-blur-sm">
              <Sparkles size={12} className="text-white shrink-0" aria-hidden="true" />
              The AI-powered vape shop platform
            </div>
          </AnimateIn>

          <AnimateIn immediate animation="slide-up" delay={180}>
            <h1 className="text-[1.875rem] sm:text-4xl md:text-[2.75rem] lg:text-[3rem] font-extrabold leading-[1.1] mb-4 sm:mb-5 tracking-tight">
              <span className="text-white">Your AI Flavor Sommelier</span>
              <br />
              <span className="text-[#c4b5fd]">Built for vape retail</span>
            </h1>
          </AnimateIn>

          <AnimateIn immediate animation="slide-up" delay={260}>
            <p className="text-white text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-7 sm:mb-8 leading-relaxed font-normal">
              Give every customer a personalized flavor recommendation the moment they walk in — compliant by design, powered by AI, and connected to your live inventory.
            </p>
          </AnimateIn>

          <AnimateIn immediate animation="slide-up" delay={340}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-10">
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

          <AnimateIn immediate animation="slide-up" delay={420}>
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

      <PlatformEngines />

      <ComplianceShield />

      <SommelierFeature />

      <div className="gradient-mesh">

      <PricingSection />

      {/* CTA */}
      <section className="container-app max-w-7xl pb-20">
        <AnimateIn animation="scale-in" duration={600}>
          <div className="rounded-3xl gradient-brand p-10 sm:p-14 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" aria-hidden="true" />
            <div className="relative">
              <AnimateIn animation="slide-up" delay={150}>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ready to go digital?</h2>
              </AnimateIn>
              <AnimateIn animation="slide-up" delay={230}>
                <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
                  Join hundreds of vape shops replacing paper cards with wallet passes.
                </p>
              </AnimateIn>
              <AnimateIn animation="slide-up" delay={310}>
                <Button onClick={openComingSoon} variant="secondary" size="lg" className="bg-white text-brand-700 hover:bg-white/90 border-0">
                  Start your free trial <ArrowRight size={18} />
                </Button>
              </AnimateIn>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-surface">
        <AnimateIn animation="fade-in" duration={500}>
          <div className="container-app max-w-7xl py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size={28} showText />
            <p className="text-body text-sm">© 2025 VapePass. All rights reserved.</p>
          </div>
        </AnimateIn>
      </footer>
      </div>
    </div>
  );
}

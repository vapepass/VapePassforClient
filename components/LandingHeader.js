'use client';
import { Sparkles } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';
import Logo from '@/components/Logo';

export default function LandingHeader({ solid = false, onSignIn, onGetStarted }) {
  return (
    <header
      className={[
        'sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        solid ? 'bg-white shadow-sm' : 'bg-[#E2DBEB] border-y border-[#7C3AED]',
      ].join(' ')}
    >
      <nav
        className="flex items-center justify-between py-3.5 w-full px-3 sm:px-5 md:px-8 lg:px-10 xl:px-14 2xl:px-16"
        aria-label="Main navigation"
      >
        <AnimateIn immediate animation="slide-down" duration={400} className="shrink-0">
          <Logo size={28} showText icon="sparkles" />
        </AnimateIn>
        <AnimateIn immediate animation="slide-down" delay={80} duration={400} className="flex items-center gap-3 sm:gap-5 shrink-0">
          <span
            className={[
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-brand-600 border border-brand-200/60',
              solid ? 'bg-brand-50' : 'bg-white',
            ].join(' ')}
          >
            <Sparkles size={10} aria-hidden="true" />
            Coming Soon
          </span>
          <button
            type="button"
            onClick={onSignIn}
            className="text-xs font-medium text-[#1F2937] hover:text-brand-600 transition-colors"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={onGetStarted}
            className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full transition-colors"
          >
            Get Started
          </button>
        </AnimateIn>
      </nav>
    </header>
  );
}

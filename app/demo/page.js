'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import { useComingSoon } from '@/components/ComingSoonProvider';
export default function DemoTour() {
  const { openComingSoon } = useComingSoon();

  return (
    <div className="min-h-screen gradient-mesh flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-line/60">
        <nav className="container-app flex items-center justify-between h-16 max-w-5xl" aria-label="Demo navigation">
          <Logo size={32} showText href="/" />
          <div className="flex items-center gap-3">
            <Button onClick={openComingSoon} size="sm">
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1 container-app max-w-5xl py-10 sm:py-14">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Back to homepage
          </Link>
        </div>

        <div className="rounded-3xl bg-surface border border-line shadow-lg overflow-hidden">
          <div className="p-7 sm:p-10 text-center border-b border-line-subtle">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-brand shadow-brand mb-5">
              <Sparkles size={26} className="text-white" aria-hidden="true" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
              Try the AI Flavor Sommelier
            </h1>
            <p className="text-body text-lg max-w-2xl mx-auto leading-relaxed">
              Give every customer personalized flavor recommendations — compliant by design and built for vape retail.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
              <Button onClick={openComingSoon} size="lg">
                Get Started <ArrowRight size={18} />
              </Button>
              <Button as="a" href="mailto:hello@vapepass.com?subject=Book%20a%20Demo" variant="secondary" size="lg">
                Book a Demo
              </Button>
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-3">
                  What it helps with
                </h2>
                <ul className="space-y-3 text-sm text-body leading-relaxed">
                  {[
                    'Instant flavor matching based on sweet, minty, fruity, or heavy-ice preferences.',
                    'Guided recommendations that stay compliant with vape regulations.',
                    'Connected to your live inventory so suggestions stay in stock.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl gradient-brand p-[1px] shadow-brand">
                <div className="rounded-2xl bg-ink p-6 sm:p-7 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-4">
                    Sample conversation
                  </p>
                  <div className="space-y-3">
                    <div className="max-w-[92%] bg-white/10 border border-white/15 rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed">
                      Hi! I&apos;m your VapePass Flavor Sommelier. What flavors are you into?
                    </div>
                    <div className="max-w-[92%] ml-auto bg-white text-ink rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed">
                      Something tropical but not too sweet, with ice.
                    </div>
                    <div className="max-w-[92%] bg-white/10 border border-white/15 rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed">
                      Perfect — you&apos;d love Passion Fruit Iced or Guava Frost. Both are in stock right now.
                    </div>
                  </div>
                  <p className="text-[11px] text-white/60 mt-5 leading-snug">
                    Demo preview only. No real store or customer data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

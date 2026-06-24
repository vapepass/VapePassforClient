'use client';
import Link from 'next/link';
import { QrCode, Smartphone, Gift, Zap, ArrowRight, Check, Star, ChevronRight, Sparkles } from 'lucide-react';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useComingSoon } from '@/components/ComingSoonProvider';

const features = [
  { icon: QrCode, title: 'QR Scan to Join', desc: 'Customers scan a code and instantly get their digital loyalty card. No app download needed.' },
  { icon: Smartphone, title: 'Wallet Integration', desc: 'Cards live in Apple Wallet and Google Wallet. Always accessible, never lost.' },
  { icon: Gift, title: 'Automatic Rewards', desc: 'Track visits or points automatically. Customers see progress update in real-time.' },
  { icon: Zap, title: 'Setup in Minutes', desc: 'Create your loyalty program and start scanning customers in under 10 minutes.' },
];

const steps = [
  { n: '01', title: 'Create Program', desc: 'Set up your loyalty program with custom rewards and rules.' },
  { n: '02', title: 'Customers Scan', desc: 'Print your QR code. Customers scan to get their digital card.' },
  { n: '03', title: 'Track & Reward', desc: 'Scan customers at checkout. Rewards are tracked automatically.' },
];

const plan = {
  name: 'Pro',
  price: '$100',
  features: [
    'Unlimited programs',
    'Unlimited customers',
    'Wallet integration',
    'Advanced analytics',
    'Priority support',
    'Custom branding',
  ],
};

export default function Landing() {
  const { openComingSoon } = useComingSoon();

  return (
    <div className="min-h-screen bg-white">
      {/* Header + Hero */}
      <div className="bg-white">
        <header className="bg-white">
          <nav
            className="flex items-center justify-between px-6 md:px-10 py-5 max-w-7xl mx-auto"
            aria-label="Main navigation"
          >
            <Logo size={32} showText />
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#f0ebfd] text-brand-600">
                <Sparkles size={12} aria-hidden="true" />
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
                className="inline-flex items-center justify-center px-[26px] py-3 text-[15px] font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-colors shadow-sm"
              >
                Get Started
              </button>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-16 md:pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 bg-[#f0ebfd] text-brand-600">
            <Star size={14} fill="#7c3aed" color="#7c3aed" aria-hidden="true" />
            Digital loyalty cards for vape shops
          </div>

          <h1 className="text-[2.75rem] sm:text-5xl md:text-[3.5rem] font-extrabold leading-[1.1] mb-7 text-ink tracking-tight">
            Replace paper punch cards
            <br />
            <span className="text-brand-600">with digital passes</span>
          </h1>

          <p className="text-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Customers scan a QR code, add a loyalty card to their phone wallet, and track rewards — no app download required. Set up in under 10 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={openComingSoon}
              className="inline-flex items-center justify-center gap-2 px-[26px] py-3 text-[15px] font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-colors shadow-sm min-w-[200px]"
            >
              Start Free Trial <ArrowRight size={16} />
            </button>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-[26px] py-3 text-[15px] font-semibold text-ink bg-white border-[1.5px] border-[#e5e5ec] hover:bg-[#fafafa] hover:border-[#d4d4dc] rounded-full transition-colors min-w-[200px]"
            >
              See Demo
            </Link>
          </div>
        </section>
      </div>

      {/* Wallet preview + features intro */}
      <section className="bg-[#f9fafb] pt-4 pb-20 sm:pb-24">
        <div className="max-w-md mx-auto px-6 mb-16 sm:mb-20">
          <div
            className="relative rounded-3xl p-8 sm:p-10 text-left overflow-hidden shadow-[0_24px_48px_rgba(91,33,182,0.18),0_8px_16px_rgba(91,33,182,0.08)]"
            style={{ background: 'linear-gradient(145deg, #9f7aea 0%, #7c3aed 45%, #5b21b6 100%)' }}
          >
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/10" aria-hidden="true" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-white/[0.07]" aria-hidden="true" />
            <div className="absolute top-8 right-8 w-28 h-28 rounded-full bg-white/[0.06]" aria-hidden="true" />

            <div className="flex items-start justify-between mb-6 relative">
              <div>
                <p className="text-white font-bold text-xl tracking-tight">Cloud Nine Vapes</p>
                <p className="text-white/70 text-sm mt-0.5">VIP Loyalty Card</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/20">
                <Gift size={13} aria-hidden="true" /> 1 reward
              </div>
            </div>

            <div className="flex gap-2 mb-7 flex-wrap relative" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={[
                    'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0',
                    i < 7 ? 'bg-white shadow-[0_0_14px_rgba(255,255,255,0.45)]' : 'bg-white/20',
                  ].join(' ')}
                >
                  {i < 7 && (
                    <Star size={15} fill="none" stroke="#7c3aed" strokeWidth={2.5} aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-end justify-between relative">
              <div>
                <p className="text-white/70 text-sm">7 / 10 visits</p>
                <p className="text-white font-bold text-lg mt-0.5">Alex Johnson</p>
              </div>
              <div className="w-20 h-20 rounded-xl bg-white p-2 flex-shrink-0">
                <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
                  <rect x="5" y="5" width="30" height="30" rx="2" fill="none" stroke="black" strokeWidth="7" />
                  <rect x="14" y="14" width="12" height="12" fill="black" />
                  <rect x="65" y="5" width="30" height="30" rx="2" fill="none" stroke="black" strokeWidth="7" />
                  <rect x="74" y="14" width="12" height="12" fill="black" />
                  <rect x="5" y="65" width="30" height="30" rx="2" fill="none" stroke="black" strokeWidth="7" />
                  <rect x="14" y="74" width="12" height="12" fill="black" />
                  <rect x="50" y="50" width="8" height="8" fill="black" />
                  <rect x="62" y="50" width="8" height="8" fill="black" />
                  <rect x="74" y="50" width="8" height="8" fill="black" />
                  <rect x="86" y="50" width="8" height="8" fill="black" />
                  <rect x="50" y="62" width="8" height="8" fill="black" />
                  <rect x="74" y="62" width="8" height="8" fill="black" />
                  <rect x="50" y="74" width="8" height="8" fill="black" />
                  <rect x="62" y="74" width="8" height="8" fill="black" />
                  <rect x="86" y="74" width="8" height="8" fill="black" />
                  <rect x="50" y="86" width="8" height="8" fill="black" />
                  <rect x="74" y="86" width="8" height="8" fill="black" />
                  <rect x="86" y="86" width="8" height="8" fill="black" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center px-6 max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-4">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="text-[#6b7280] text-lg leading-relaxed">
            The simplest way to run a loyalty program. No complexity, no learning curve.
          </p>
        </div>

        <div className="container-app max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} hover className="group bg-white">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                  <Icon size={20} className="text-brand-600" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg text-ink mb-2 tracking-tight">{title}</h3>
                <p className="text-body text-sm leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-mesh">

      {/* How it works */}
      <section className="py-20 sm:py-24 bg-[#f9fafb]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-14">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {steps.map(({ n, title, desc }) => (
              <div key={n}>
                <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-5 font-bold text-xl text-white">
                  {n}
                </div>
                <h3 className="font-bold text-xl text-[#111827] mb-3 tracking-tight">{title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-4">
            Simple pricing
          </h2>
          <p className="text-[#6b7280] text-lg mb-14">
            Start free. Upgrade when you&apos;re ready.
          </p>

          <div className="max-w-sm mx-auto">
            <div className="relative rounded-2xl p-8 text-left bg-white border-2 border-brand-600 shadow-[0_8px_30px_rgba(124,58,237,0.12)] flex flex-col">
              <span className="absolute -top-3 left-8 px-3 py-1 rounded-full text-xs font-bold text-white bg-brand-600">
                Most Popular
              </span>
              <p className="font-bold text-xl text-[#111827] mb-4 mt-2">{plan.name}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[#111827] tracking-tight">{plan.price}</span>
                <span className="text-[#6b7280] text-sm"> /month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#111827]">
                    <Check size={15} className="text-brand-600 flex-shrink-0" strokeWidth={2.5} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={openComingSoon}
                className="w-full inline-flex items-center justify-center gap-1 px-[26px] py-3 text-[15px] font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-colors"
              >
                Get Started <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app max-w-7xl pb-20">
        <div className="rounded-3xl gradient-brand p-10 sm:p-14 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ready to go digital?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
              Join hundreds of vape shops replacing paper cards with wallet passes.
            </p>
            <Button onClick={openComingSoon} variant="secondary" size="lg" className="bg-white text-brand-700 hover:bg-white/90 border-0">
              Start your free trial <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-surface">
        <div className="container-app max-w-7xl py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size={28} showText />
          <p className="text-body text-sm">© 2025 VapePass. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </div>
  );
}

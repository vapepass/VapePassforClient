'use client';
import { Brain, ShieldCheck, Check } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';

const engines = [
  {
    title: 'AI Sommelier',
    accent: '#8b5cf6',
    icon: Brain,
    items: [
      'Palate profiling in real-time',
      'Matches preferences to live SKUs',
      'Personalized recs for every customer',
    ],
  },
  {
    title: 'Compliance Engine',
    accent: '#10b981',
    icon: ShieldCheck,
    items: [
      'Age-gate intercept (19/21+)',
      'Vocabulary hard-stop on claims',
      'Federal warnings auto-injected',
    ],
  },
];

function EngineCard({ title, accent, icon: Icon, items, delay = 0 }) {
  return (
    <AnimateIn animation="slide-up" delay={delay}>
      <article className="h-full rounded-3xl bg-white shadow-[0_4px_24px_rgba(12,12,18,0.06)] overflow-hidden">
        <div className="h-2" style={{ backgroundColor: accent }} aria-hidden="true" />
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-3.5 mb-7">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: accent }}
            >
              <Icon size={20} className="text-white" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-[#111827] tracking-tight">{title}</h3>
          </div>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-[#6b7280] leading-relaxed">
                <Check
                  size={16}
                  className="text-brand-600 flex-shrink-0 mt-0.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </AnimateIn>
  );
}

export default function PlatformEngines() {
  return (
    <section className="bg-[#f9fafb] py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-14">
          <AnimateIn animation="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-4">
              Two engines. One platform.
            </h2>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={100}>
            <p className="text-[#6b7280] text-lg leading-relaxed max-w-2xl mx-auto">
              Everything a modern vape shop needs — AI recommendations and compliance — unified.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {engines.map((engine, index) => (
            <EngineCard key={engine.title} {...engine} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

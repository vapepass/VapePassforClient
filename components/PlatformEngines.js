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
      <article className="h-full rounded-2xl bg-white shadow-[0_4px_24px_rgba(12,12,18,0.06)] overflow-hidden">
        <div className="h-1.5" style={{ backgroundColor: accent }} aria-hidden="true" />
        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: accent }}
            >
              <Icon size={18} className="text-white" aria-hidden="true" />
            </div>
            <h3 className="platform-card-title">{title}</h3>
          </div>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 platform-card-text">
                <Check
                  size={15}
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
    <section className="bg-[#f9fafb] py-14 sm:py-16 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8 sm:mb-10">
          <AnimateIn animation="slide-up">
            <h2 className="platform-heading mb-3">
              Two engines. One platform.
            </h2>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={100}>
            <p className="platform-subheading max-w-xl mx-auto">
              Everything a modern vape shop needs — AI recommendations and
              <br />
              compliance — unified.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {engines.map((engine, index) => (
            <EngineCard key={engine.title} {...engine} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

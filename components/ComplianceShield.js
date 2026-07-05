'use client';
import { ShieldCheck, Lock, MegaphoneOff, FileWarning } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';

const complianceFeatures = [
  {
    title: 'Age-Gate Intercept',
    description: 'Widget is hidden until the visitor clears the Over-19/21 barrier. No exceptions.',
    icon: Lock,
  },
  {
    title: 'Vocabulary Hard-Stop',
    description: 'Bans illegal lifestyle claims and cessation advice at the model layer — not post-processing.',
    icon: MegaphoneOff,
  },
  {
    title: 'Mandatory Warnings',
    description: 'Federal nicotine health warnings are baked into every chat window and pass.',
    icon: FileWarning,
  },
];

function ComplianceCard({ title, description, icon: Icon, delay = 0 }) {
  return (
    <AnimateIn animation="slide-up" delay={delay}>
      <article className="h-full rounded-2xl bg-white border border-[#e8e9ef] shadow-[0_4px_24px_rgba(12,12,18,0.04)] p-6 sm:p-7 text-left">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
          <Icon size={18} className="text-emerald-600" strokeWidth={2} aria-hidden="true" />
        </div>
        <h3 className="text-base font-bold text-[#111827] tracking-tight mb-2">{title}</h3>
        <p className="text-sm text-[#6b7280] leading-relaxed">{description}</p>
      </article>
    </AnimateIn>
  );
}

export default function ComplianceShield() {
  return (
    <section className="bg-[#f9fafb] py-14 sm:py-16 font-sans">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-8 sm:mb-10">
          <AnimateIn animation="slide-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700">
              <ShieldCheck size={13} className="shrink-0" aria-hidden="true" />
              Compliance Shield
            </div>
          </AnimateIn>

          <AnimateIn animation="slide-up" delay={80}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight mb-3">
              Engineered for TVPA • FDA • Health Canada
            </h2>
          </AnimateIn>

          <AnimateIn animation="slide-up" delay={160}>
            <p className="compliance-subheading max-w-xl mx-auto">
              We&apos;ve baked every regulatory requirement into the platform so you
              <br />
              never have to think about it.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {complianceFeatures.map((feature, index) => (
            <ComplianceCard key={feature.title} {...feature} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

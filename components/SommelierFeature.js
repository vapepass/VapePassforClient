'use client';
import { Brain, Zap, Sparkles, AlertTriangle } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';

const features = [
  {
    icon: Brain,
    text: 'Daily inventory scrape — AI never recommends out-of-stock brands',
  },
  {
    icon: Zap,
    text: 'Palate profiling maps sweet, minty, heavy-ice preferences to exact SKUs',
  },
  {
    icon: Sparkles,
    text: 'Conversational AI guides every customer to their perfect flavor',
  },
];

const chatMessages = [
  {
    role: 'ai',
    text: "Hi! I'm your VapePass Flavor Sommelier. What flavors are you into? 🍇",
  },
  {
    role: 'user',
    text: 'Something tropical but not too sweet, with ice.',
  },
  {
    role: 'ai',
    text: "Perfect — you'd love Passion Fruit Iced or Guava Frost. Both are in stock right now. 🍉🧊",
  },
];

function StorefrontChatCard() {
  return (
    <div className="rounded-2xl bg-white border border-[#e8e9ef] shadow-[0_6px_24px_rgba(12,12,18,0.07)] p-6 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-brand-600" aria-hidden="true" />
          </div>
          <span className="text-[15px] font-semibold text-[#111827] tracking-tight truncate">
            Live on your storefront
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-[13px] font-medium text-emerald-600">Active</span>
        </div>
      </div>

      <div className="space-y-3">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={[
              'max-w-[88%] px-4 py-3 rounded-xl text-[14px] leading-[1.55]',
              message.role === 'user'
                ? 'ml-auto bg-brand-600 text-white rounded-br-sm'
                : 'bg-[#f3f4f6] text-[#374151] rounded-bl-sm',
            ].join(' ')}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 mt-5 pt-4 border-t border-[#f0f1f5]">
        <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-xs text-[#9ca3af] leading-snug">
          Vaping products contain nicotine, which is addictive. 19+ only.
        </p>
      </div>
    </div>
  );
}

export default function SommelierFeature() {
  return (
    <section className="bg-[#f9fafb] py-20 sm:py-24 font-sans">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 items-center">
          <div className="text-left">
            <AnimateIn animation="slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold mb-6 bg-brand-50 text-brand-600">
                <Brain size={14} className="shrink-0" aria-hidden="true" />
                AI Flavor Sommelier
              </div>
            </AnimateIn>

            <AnimateIn animation="slide-up" delay={80}>
              <h2 className="text-2xl sm:text-[2rem] font-bold text-[#111827] tracking-tight mb-5 leading-[1.2]">
                Personalized recs, every customer, every visit
              </h2>
            </AnimateIn>

            <AnimateIn animation="slide-up" delay={160}>
              <p className="text-[#6b7280] text-[15px] sm:text-base leading-relaxed mb-7">
                The sommelier learns each customer&apos;s palate — sweet, minty, fruity, heavy-ice — and maps it to your live inventory so you never recommend something that&apos;s out of stock.
              </p>
            </AnimateIn>

            <ul className="space-y-4">
              {features.map(({ icon: Icon, text }, index) => (
                <AnimateIn key={text} animation="slide-up" delay={240 + index * 80} as="li">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-brand-600" aria-hidden="true" />
                    </div>
                    <p className="text-[15px] text-[#6b7280] leading-snug pt-1">{text}</p>
                  </div>
                </AnimateIn>
              ))}
            </ul>
          </div>

          <AnimateIn animation="slide-up" delay={200}>
            <StorefrontChatCard />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

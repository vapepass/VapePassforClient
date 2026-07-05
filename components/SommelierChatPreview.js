'use client';
import { Sparkles } from 'lucide-react';

const messages = [
  {
    role: 'ai',
    text: 'What flavor profiles does this customer usually enjoy?',
  },
  {
    role: 'user',
    text: 'They like fruity, something with a light ice finish.',
  },
  {
    role: 'ai',
    text: 'Try our Mango Lychee Frost or Watermelon Ice — both are in stock and match that palate perfectly. 🍉🧊',
  },
];

export default function SommelierChatPreview() {
  return (
    <div
      className="w-full max-w-[480px] mx-auto rounded-2xl border border-white/20 bg-[#3b0764]/40 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.24),0_0_0_1px_rgba(255,255,255,0.06)_inset] p-4 sm:p-5 text-left"
      aria-label="AI Flavor Sommelier chat preview"
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <Sparkles size={13} className="text-white" aria-hidden="true" />
          </div>
          <span className="text-white font-semibold text-[13px] sm:text-sm tracking-tight truncate">
            AI Flavor Sommelier
          </span>
        </div>
        <span
          className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={[
              'max-w-[90%] px-3 py-2 rounded-xl text-[12px] sm:text-[13px] leading-[1.5] text-white',
              message.role === 'user'
                ? 'ml-auto bg-[#9333ea] shadow-sm'
                : 'bg-white/[0.1] border border-white/[0.06]',
            ].join(' ')}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}

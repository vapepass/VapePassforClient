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
      className="w-full max-w-[380px] sm:max-w-[400px] mx-auto rounded-[28px] border border-[#a78bfa]/25 bg-[#6d28d9]/35 backdrop-blur-xl shadow-[0_20px_56px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] p-6 sm:p-7 text-left"
      aria-label="AI Flavor Sommelier chat preview"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center shrink-0">
            <Sparkles size={15} className="text-white" aria-hidden="true" />
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight truncate">
            AI Flavor Sommelier
          </span>
        </div>
        <span
          className="w-2.5 h-2.5 rounded-full bg-[#48bb78] shrink-0 shadow-[0_0_8px_rgba(72,187,120,0.55)]"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-3.5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={[
              'max-w-[92%] px-4 py-3 rounded-[20px] text-[14px] leading-[1.55] text-white font-normal',
              message.role === 'user'
                ? 'ml-auto bg-[#805ad5]'
                : 'bg-white/10 border border-white/[0.08]',
            ].join(' ')}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}

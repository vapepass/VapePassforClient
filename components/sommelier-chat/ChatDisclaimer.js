'use client';

export default function ChatDisclaimer({ text }) {
  return (
    <div className="sommelier-chat-disclaimer mt-2.5 px-3 py-2 rounded-xl border border-warning-500/20 bg-warning-50/80">
      <p className="text-[11px] leading-snug text-warning-600 font-medium">{text}</p>
    </div>
  );
}

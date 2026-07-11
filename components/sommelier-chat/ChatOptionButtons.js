'use client';

export default function ChatOptionButtons({ options, onSelect, disabled = false, layout = 'stack' }) {
  if (!options?.length) return null;

  return (
    <div
      className={[
        'sommelier-chat-options',
        layout === 'grid' ? 'grid grid-cols-2 gap-2' : 'flex flex-col gap-2',
      ].join(' ')}
    >
      {options.map((option, index) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onSelect(option)}
          disabled={disabled}
          style={{ animationDelay: `${index * 50}ms` }}
          className={[
            'sommelier-chat-option-btn',
            layout === 'grid' ? 'text-[13px] px-3' : 'w-full',
            'h-11 rounded-full text-sm font-semibold transition-colors duration-200',
            'bg-white border border-[#e5e7eb] text-[#374151]',
            'hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700',
            'active:scale-[0.98]',
            'disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:border-[#e5e7eb] disabled:hover:bg-white disabled:hover:text-[#374151] disabled:active:scale-100',
          ].join(' ')}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

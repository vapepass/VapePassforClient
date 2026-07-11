'use client';

import { CONVERSATION_STEPS, isAgeGateStep } from './conversation';

export function AgeGateButtons({ options, onSelect, disabled = false }) {
  const yesOption = options.find((option) => option.value === 'yes');
  const noOption = options.find((option) => option.value === 'no');

  if (!yesOption || !noOption) return null;

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onSelect(yesOption)}
        disabled={disabled}
        className="sommelier-chat-age-btn flex-[2.15] h-11 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100"
      >
        {yesOption.label}
      </button>
      <button
        type="button"
        onClick={() => onSelect(noOption)}
        disabled={disabled}
        className="sommelier-chat-age-btn flex-1 h-11 rounded-full bg-[#eef0f4] hover:bg-[#e5e7eb] text-[#4b5563] text-sm font-semibold transition-colors active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100"
      >
        {noOption.label}
      </button>
    </div>
  );
}

export function ChoiceRowButtons({ options, onSelect, disabled = false }) {
  return (
    <div className="flex gap-2">
      {options.map((option, index) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onSelect(option)}
          disabled={disabled}
          style={{ animationDelay: `${index * 50}ms` }}
          className="sommelier-chat-option-btn flex-1 h-11 rounded-full bg-[#eef0f4] hover:bg-[#e5e7eb] text-[#374151] text-sm font-semibold transition-colors active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export { CONVERSATION_STEPS, isAgeGateStep };

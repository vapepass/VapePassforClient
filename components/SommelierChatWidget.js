'use client';

import { useEffect, useRef, useState } from 'react';
import { Minimize2, Send, Sparkles, X } from 'lucide-react';

const NICOTINE_NOTE =
  'Please note that vaping products contain nicotine, which is addictive.';

const OPENING_MESSAGE = {
  id: 'opening',
  role: 'bot',
  text: "👋 Hey! I'm the VapePass Flavor Sommelier. I can help you find your perfect vape flavor profile based on your taste preferences.\n\n**Are you 19 or older?** *(This service is for adults only)*",
};

const RESPONSES = [
  {
    id: 'age-yes',
    match: (t) =>
      t === 'yes' ||
      t === '19' ||
      t.includes("i'm 19") ||
      t.includes('im 19') ||
      t.includes('yes i') ||
      t.includes('over 19') ||
      t.includes('19+') ||
      t.includes('yes, i') ||
      t === "yes, i'm 19+",
    text: "Great! Let's find your perfect flavor. 🍇🍦🧊\n\nWhat kinds of flavors do you generally enjoy?\n\nExamples:\n• Fruity\n• Minty\n• Menthol\n• Dessert/Sweet\n• Tobacco",
  },
  {
    id: 'age-no',
    match: (t) => t === 'no' || t.includes('under 19') || t.includes('not 19'),
    text: "Thanks for being honest.\n\nThis service is only available for adults 19+. Please come back when you're of legal age.\n\nStay safe! 👋",
  },
  {
    id: 'menthol',
    match: (t) => t.includes('menthol'),
    text: `Understood!\n\nDo you prefer a crisp, straight-up menthol, or do you enjoy your menthol paired with fruit or candy notes?\n\nAlso, are you looking for:\n\n• Light cooling\n\nor\n\n• Heavy ice effect?\n\n${NICOTINE_NOTE}`,
  },
  {
    id: 'crisp',
    match: (t) => t.includes('crisp'),
    text: `If you prefer a crisp, straightforward experience, you might enjoy a pure icy menthol profile or a blend that mimics peppermint or spearmint leaves.\n\nBoth options offer a clean, refreshing finish without fruit or sweetness.\n\n${NICOTINE_NOTE}`,
  },
  {
    id: 'ok',
    match: (t) => t === 'ok' || t === 'okay',
    text: `Awesome!\n\nYou're all set.\n\nIf you ever want another recommendation, I'm here to help.\n\n${NICOTINE_NOTE}`,
  },
  {
    id: 'sure',
    match: (t) => t === 'sure',
    text: `Is there anything else you'd like to explore?\n\nMaybe something:\n\n• Fruity\n\n• Dessert\n\n• Mint\n\n• Tobacco\n\nI'm happy to help you discover another flavor profile whenever you're ready.\n\n${NICOTINE_NOTE}`,
  },
  {
    id: 'fruity',
    match: (t) => t.includes('fruit'),
    text: `Nice choice! Fruity profiles are always a crowd favorite. 🍉🍓\n\nDo you lean more toward:\n\n• Tropical (mango, passion fruit, pineapple)\n• Berry (strawberry, blueberry, raspberry)\n• Citrus (lemon, lime, orange)\n\nAnd would you like it with ice, or straight fruit?\n\n${NICOTINE_NOTE}`,
  },
  {
    id: 'minty',
    match: (t) => t.includes('mint'),
    text: `Got it — minty it is! ❄️\n\nWould you prefer:\n\n• Soft peppermint\n• Spearmint\n• Menthol with a cool finish\n\nAlso, light cooling or heavy ice?\n\n${NICOTINE_NOTE}`,
  },
  {
    id: 'dessert',
    match: (t) => t.includes('dessert') || t.includes('sweet') || t.includes('candy'),
    text: `Sweet tooth detected 🍦\n\nPopular dessert directions:\n\n• Creamy (vanilla custard, ice cream)\n• Bakery (donut, cake, cookie)\n• Candy (gummy, cotton candy)\n\nWhich sounds closer to what you usually enjoy?\n\n${NICOTINE_NOTE}`,
  },
  {
    id: 'tobacco',
    match: (t) => t.includes('tobacco'),
    text: `Understood — tobacco profiles can be great for a classic feel.\n\nDo you prefer:\n\n• Straight tobacco\n• Sweet tobacco\n• Nutty / roasted notes\n\nAny preference for cooling (none / light / strong)?\n\n${NICOTINE_NOTE}`,
  },
];

const FALLBACK =
  "I can help with flavor profiles like Menthol, Fruity, Minty, Dessert/Sweet, or Tobacco.\n\nTry typing one of those, or say \"Yes\" if you haven't confirmed you're 19+ yet.\n\n" +
  NICOTINE_NOTE;

function getBotReply(userText) {
  const normalized = userText.toLowerCase().trim();
  const match = RESPONSES.find((item) => item.match(normalized));
  return match ? match.text : FALLBACK;
}

function MessageText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <p className="whitespace-pre-wrap text-[14px] leading-[1.55]">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={index} className="italic opacity-90">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start sommelier-chat-message">
      <div className="bg-[#f3f4f6] text-[#374151] px-4 py-3 rounded-2xl rounded-bl-md inline-flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af] animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af] animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af] animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export default function SommelierChatWidget({ open, onClose, onMinimize }) {
  const [messages, setMessages] = useState([OPENING_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ageGateActive, setAgeGateActive] = useState(true);
  const [ended, setEnded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 280);
    return () => clearTimeout(timer);
  }, [open, ageGateActive]);

  useEffect(() => {
    // Keep content visible during exit transition, then reset state so next open starts fresh.
    if (open) {
      setIsExiting(false);
      return;
    }

    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    setIsExiting(true);
    resetTimeoutRef.current = setTimeout(() => {
      setMessages([OPENING_MESSAGE]);
      setInput('');
      setIsTyping(false);
      setAgeGateActive(true);
      setEnded(false);
      setIsExiting(false);
    }, 280);
  }, [open]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isTyping, open]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const pushBotReply = (userText) => {
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      const reply = getBotReply(userText);
      setMessages((current) => [
        ...current,
        {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: reply,
        },
      ]);
      setIsTyping(false);

      const normalized = userText.toLowerCase().trim();
      if (
        normalized === 'yes' ||
        normalized === '19' ||
        normalized.includes("i'm 19") ||
        normalized.includes('im 19') ||
        normalized.includes('over 19') ||
        normalized.includes('19+') ||
        normalized.includes('yes i')
      ) {
        setAgeGateActive(false);
      }
      if (
        normalized === 'no' ||
        normalized.includes('under 19') ||
        normalized.includes('not 19')
      ) {
        setAgeGateActive(false);
      }
    }, 1200);
  };

  const sendMessage = (rawText) => {
    const text = rawText.trim();
    if (!text || isTyping || ended) return;

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        text,
      },
    ]);
    setInput('');
    pushBotReply(text);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleAgeYes = () => {
    if (isTyping || ended) return;
    setAgeGateActive(false);
    sendMessage("Yes, I'm 19+");
  };

  const handleAgeNo = () => {
    if (isTyping || ended) return;

    // Required behavior:
    // - Show message immediately
    // - Wait 2–3 seconds
    // - Auto close + reset
    setEnded(true);
    setAgeGateActive(false);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setIsTyping(false);

    setMessages((current) => [
      ...current,
      {
        id: `bot-end-${Date.now()}`,
        role: 'bot',
        text: 'VapePass Assistant is only available to persons 19 years of age or older in British Columbia. This conversation has ended.',
      },
    ]);

    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      onClose?.();
    }, 2500);
  };

  return (
    <div
      className={[
        'fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] max-w-[380px] sommelier-chat-panel',
        open && !isExiting
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-[0.985] pointer-events-none',
      ].join(' ')}
      role="dialog"
      aria-label="AI Flavor Sommelier chatbot"
      aria-modal="false"
      aria-hidden={open ? 'false' : 'true'}
    >
      <div className="flex flex-col h-[min(560px,70vh)] rounded-3xl overflow-hidden bg-white shadow-[0_20px_50px_rgba(12,12,18,0.22)] border border-[#e8e9ef]">
        {/* Header */}
        <div className="bg-brand-600 px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <Sparkles size={18} className="text-white" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-[15px] tracking-tight truncate">
                AI Flavor Sommelier
              </p>
              <p className="text-white/75 text-xs truncate">Powered by VapePass</p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onMinimize}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/85 hover:bg-white/15 transition-colors"
              aria-label="Minimize chat"
            >
              <Minimize2 size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/85 hover:bg-white/15 transition-colors"
              aria-label="Close chat"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Warning banner */}
        <div className="px-3.5 py-2.5 bg-[#fff8e8] border-b border-[#f5e6c8] shrink-0">
          <p className="text-[12px] leading-snug text-[#9a6b16]">
            ⚠️ Vaping products contain nicotine, which is addictive. For adults 19+ only.
          </p>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3 bg-[#fafafa]"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={[
                'flex sommelier-chat-message',
                message.role === 'user' ? 'justify-end' : 'justify-start',
              ].join(' ')}
            >
              <div
                className={[
                  'max-w-[88%] px-3.5 py-2.5 rounded-2xl',
                  message.role === 'user'
                    ? 'bg-brand-600 text-white rounded-br-md'
                    : 'bg-[#f3f4f6] text-[#374151] rounded-bl-md',
                ].join(' ')}
              >
                <MessageText text={message.text} />
              </div>
            </div>
          ))}

          {isTyping ? <TypingIndicator /> : null}
        </div>

        {/* Age gate buttons (first step) */}
        {ageGateActive && !isTyping && !ended ? (
          <div className="px-3.5 pb-3 pt-1 bg-[#fafafa] border-t border-[#f0f1f5] shrink-0">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAgeYes}
                className="flex-1 h-11 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors"
              >
                Yes, I&apos;m 19+
              </button>
              <button
                type="button"
                onClick={handleAgeNo}
                className="flex-1 h-11 rounded-full bg-[#eef0f4] hover:bg-[#e5e7eb] text-[#4b5563] text-sm font-semibold transition-colors"
              >
                No
              </button>
            </div>
          </div>
        ) : !ended ? (
          <form
            onSubmit={handleSubmit}
            className="px-3.5 py-3 bg-white border-t border-[#e8e9ef] shrink-0"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message..."
                disabled={isTyping || ended}
                className="flex-1 h-11 px-4 text-sm text-[#111827] bg-[#f9fafb] border border-[#e5e7eb] rounded-full placeholder:text-[#9ca3af] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all disabled:opacity-60"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping || ended}
                className="w-11 h-11 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send size={16} aria-hidden="true" />
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { Minimize2, Send, ShoppingCart, Sparkles, X } from 'lucide-react';
import { AgeGateButtons, ChoiceRowButtons } from './ChatActionButtons';
import ChatBubble from './ChatBubble';
import ChatOptionButtons from './ChatOptionButtons';
import ChatTypingIndicator from './ChatTypingIndicator';
import ProductRecommendationCard from './ProductRecommendationCard';
import SessionLockedBar from './SessionLockedBar';
import { CONVERSATION_STEPS, isAgeGateStep } from './conversation';
import useSommelierConversation from './useSommelierConversation';

export default function SommelierChatWidget({ open, onClose, onMinimize }) {
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const {
    step,
    messages,
    isTyping,
    ended,
    sessionLocked,
    isExiting,
    product,
    showProductCard,
    showAddToCart,
    activeOptions,
    optionsLayout,
    handleOptionSelect,
    handleTypedMessage,
    handleAddToCart,
  } = useSommelierConversation({ open, onClose });

  const showAgeGateButtons = activeOptions.length > 0 && isAgeGateStep(step);
  const showChoiceRowButtons =
    activeOptions.length > 0 && optionsLayout === 'row' && !isAgeGateStep(step);
  const showStackedButtons =
    activeOptions.length > 0 && optionsLayout !== 'row';
  const showTextInput = step !== CONVERSATION_STEPS.WELCOME || sessionLocked;

  useEffect(() => {
    if (!open || ended || sessionLocked || !showTextInput) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 280);
    return () => clearTimeout(timer);
  }, [open, ended, sessionLocked, showTextInput, activeOptions.length]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: sessionLocked ? 'auto' : 'smooth',
    });
  }, [messages, isTyping, showProductCard, showAddToCart, sessionLocked, open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    handleTypedMessage(text);
    setInput('');
  };

  const interactionsDisabled = isTyping || ended || sessionLocked;

  const handleMessagesWheel = (event) => {
    if (sessionLocked) event.preventDefault();
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
          onWheel={handleMessagesWheel}
          onTouchMove={sessionLocked ? (event) => event.preventDefault() : undefined}
          className={[
            'flex-1 px-3.5 py-4 space-y-3 bg-[#fafafa] sommelier-chat-scroll',
            sessionLocked ? 'overflow-hidden pointer-events-none' : 'overflow-y-auto',
          ].join(' ')}
        >
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {showProductCard ? <ProductRecommendationCard product={product} /> : null}

          {isTyping ? <ChatTypingIndicator /> : null}
        </div>

        {/* Age gate buttons — matches reference layout */}
        {showAgeGateButtons ? (
          <div className="px-3.5 pb-3 pt-1 bg-[#fafafa] shrink-0">
            <AgeGateButtons
              options={activeOptions}
              onSelect={handleOptionSelect}
              disabled={interactionsDisabled}
            />
          </div>
        ) : null}

        {/* Row choice buttons (e.g. cooling level) */}
        {showChoiceRowButtons ? (
          <div className="px-3.5 pb-2.5 pt-1 bg-[#fafafa] shrink-0">
            <ChoiceRowButtons
              options={activeOptions}
              onSelect={handleOptionSelect}
              disabled={interactionsDisabled}
            />
          </div>
        ) : null}

        {/* Stacked / grid flavor buttons */}
        {showStackedButtons ? (
          <div className="px-3.5 pb-2.5 pt-1 bg-[#fafafa] shrink-0">
            <ChatOptionButtons
              options={activeOptions}
              onSelect={handleOptionSelect}
              disabled={interactionsDisabled}
              layout={optionsLayout}
            />
          </div>
        ) : null}

        {/* Add to cart CTA */}
        {showAddToCart ? (
          <div className="px-3.5 pb-2.5 bg-[#fafafa] shrink-0">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={interactionsDisabled}
              className="sommelier-chat-cta w-full h-11 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.98] disabled:opacity-45 disabled:pointer-events-none"
            >
              <ShoppingCart size={16} aria-hidden="true" />
              Add to Cart
            </button>
          </div>
        ) : null}

        {sessionLocked ? <SessionLockedBar /> : null}

        {/* Input — hidden on welcome unless session is locked */}
        {showTextInput ? (
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
                placeholder={
                  sessionLocked
                    ? 'Session locked'
                    : ended
                      ? 'Conversation ended'
                      : 'Type your message...'
                }
                disabled={interactionsDisabled}
                readOnly={sessionLocked}
                className="flex-1 h-11 px-4 text-sm text-[#111827] bg-[#f9fafb] border border-[#e5e7eb] rounded-full placeholder:text-[#9ca3af] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Chat message"
                aria-disabled={interactionsDisabled}
              />
              <button
                type="submit"
                disabled={!input.trim() || interactionsDisabled}
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

'use client';

export default function ChatTypingIndicator() {
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

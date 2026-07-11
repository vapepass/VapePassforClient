'use client';

function MessageText({ text }) {
  const content = typeof text === 'string' ? text : String(text ?? '');

  const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <p className="whitespace-pre-wrap text-[14px] leading-[1.55] text-[#374151]">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-semibold text-[#374151]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={index} className="italic opacity-90 text-[#374151]">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={[
        'flex sommelier-chat-message',
        isUser ? 'justify-end' : 'justify-start',
      ].join(' ')}
    >
      <div
        className={[
          'max-w-[88%] px-3.5 py-2.5 rounded-2xl',
          isUser
            ? 'bg-brand-600 text-white rounded-br-md sommelier-chat-bubble-user'
            : 'bg-[#f3f4f6] text-[#374151] rounded-bl-md sommelier-chat-bubble-bot',
        ].join(' ')}
      >
        <MessageText text={message.text} />
      </div>
    </div>
  );
}

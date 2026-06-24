import { QrCode } from 'lucide-react';
import Link from 'next/link';

export default function Logo({ size = 32, showText = false, href = '/' }) {
  const content = (
    <>
      <div
        className="rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 shadow-sm"
        style={{ width: size, height: size }}
      >
        <QrCode size={size * 0.55} className="text-white" aria-hidden="true" />
      </div>
      {showText && (
        <span className="font-bold text-xl text-ink tracking-tight">VapePass</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2.5 focus-visible:rounded-xl" aria-label="VapePass home">
        {content}
      </Link>
    );
  }

  return <div className="flex items-center gap-3">{content}</div>;
}

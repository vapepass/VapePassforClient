'use client';

import ChatDisclaimer from './ChatDisclaimer';
import { NICOTINE_DISCLAIMER } from './conversation';

export default function ProductRecommendationCard({ product }) {
  if (!product) return null;

  return (
    <div className="sommelier-chat-message flex justify-start">
      <div className="w-full max-w-[92%]">
        <div className="sommelier-product-card overflow-hidden rounded-2xl border border-line bg-white shadow-md">
          <div
            className={[
              'h-2 bg-gradient-to-r',
              product.accent ?? 'from-brand-500 to-brand-700',
            ].join(' ')}
          />
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div
                className={[
                  'w-11 h-11 rounded-xl bg-gradient-to-br shrink-0 flex items-center justify-center text-white text-lg shadow-sm',
                  product.accent ?? 'from-brand-500 to-brand-700',
                ].join(' ')}
                aria-hidden="true"
              >
                ✨
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 mb-1">
                  Recommended for you
                </p>
                <h4 className="text-[16px] font-bold text-ink tracking-tight mb-1.5">
                  {product.name}
                </h4>
                <p className="text-[13px] leading-relaxed text-body whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ChatDisclaimer text={NICOTINE_DISCLAIMER} />
      </div>
    </div>
  );
}

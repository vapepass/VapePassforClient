'use client';
import WalletPassPreview from '@/components/WalletPassPreview';
import { mockStore } from '@/data/mock';
import { Wallet, Apple, PartyPopper } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CustomerCard() {
  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md text-center animate-slide-up">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-success-50 text-success-600 mb-5">
          <PartyPopper size={28} aria-hidden="true" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">You&apos;re in!</h1>
        <p className="text-body mb-8">
          Add your card below to start earning rewards at {mockStore.name}.
        </p>

        <WalletPassPreview
          store={{
            name: mockStore.name,
            color: mockStore.color,
            stampGoal: mockStore.stampGoal,
            reward: mockStore.reward,
            stamps: 0,
            customerName: 'Alex Johnson',
          }}
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button variant="dark" className="flex-1">
            <Apple size={18} /> Add to Apple Wallet
          </Button>
          <Button variant="secondary" className="flex-1">
            <Wallet size={18} /> Add to Google Wallet
          </Button>
        </div>

        <p className="text-xs text-muted mt-6">
          Show this card&apos;s QR code to staff at checkout to earn a stamp.
        </p>
      </div>
    </div>
  );
}

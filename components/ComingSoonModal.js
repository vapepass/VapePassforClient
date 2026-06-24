'use client';

import { useState } from 'react';
import {
  Check,
  Sparkles,
  LayoutDashboard,
  BarChart3,
  Gift,
  Smartphone,
  Stamp,
} from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Input, FormField } from '@/components/ui/Input';

const WAITLIST_KEY = 'vapepass_waitlist';

const features = [
  { icon: LayoutDashboard, label: 'Store Dashboard' },
  { icon: BarChart3, label: 'Customer Analytics' },
  { icon: Gift, label: 'Loyalty Program Management' },
  { icon: Smartphone, label: 'Wallet Integration' },
  { icon: Stamp, label: 'Rewards Tracking' },
];

const timeline = [
  { icon: '🚧', label: 'Merchant Portal', status: 'Coming Soon' },
  { icon: '🚧', label: 'Customer Accounts', status: 'Coming Soon' },
  { icon: '🔨', label: 'Wallet Pass Management', status: 'In Development' },
  { icon: '🚧', label: 'Analytics Dashboard', status: 'Coming Soon' },
];

function saveWaitlistEntry(data) {
  if (typeof window === 'undefined') return;
  const existing = JSON.parse(localStorage.getItem(WAITLIST_KEY) || '[]');
  existing.push({ ...data, submittedAt: new Date().toISOString() });
  localStorage.setItem(WAITLIST_KEY, JSON.stringify(existing));
}

export default function ComingSoonModal({ open, onClose }) {
  const [view, setView] = useState('main');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', storeName: '', email: '', phone: '' });

  const resetAndClose = () => {
    onClose?.();
    setTimeout(() => {
      setView('main');
      setForm({ name: '', storeName: '', email: '', phone: '' });
      setSubmitting(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    saveWaitlistEntry(form);
    setTimeout(() => {
      setSubmitting(false);
      setView('success');
    }, 600);
  };

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  if (view === 'success') {
    return (
      <Modal open={open} onClose={resetAndClose} size="md">
        <div className="text-center py-2 -mt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-success-50 text-success-600 mb-5">
            <Check size={28} strokeWidth={2.5} aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-ink tracking-tight mb-2">
            You&apos;re on the list!
          </h2>
          <p className="text-body text-sm leading-relaxed max-w-sm mx-auto mb-6">
            Thank you! We&apos;ll notify you when VapePass launches. Keep an eye on your inbox for early access updates.
          </p>
          <Button onClick={resetAndClose} className="w-full">
            Done
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={resetAndClose}
      title="Member Portal Coming Soon"
      size="lg"
    >
      <div className="-mt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-100 mb-4">
          <Sparkles size={12} aria-hidden="true" />
          Early Access Available
        </div>

        <p className="text-sm text-body leading-relaxed mb-5">
          We&apos;re currently building the VapePass merchant portal and authentication system.
          Join our early access program and we&apos;ll notify you as soon as it&apos;s available.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-ink">
              <Check size={14} className="text-brand-600 flex-shrink-0" strokeWidth={2.5} aria-hidden="true" />
              <Icon size={14} className="text-muted flex-shrink-0" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-canvas border border-line-subtle p-4 mb-6">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Development Roadmap</p>
          <ul className="space-y-2">
            {timeline.map(({ icon, label, status }) => (
              <li key={label} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-ink">
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </span>
                <span className="text-xs font-medium text-muted flex-shrink-0">{status}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 border-t border-line-subtle pt-5">
          <p className="text-sm font-semibold text-ink">Join the waitlist</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Your Name" htmlFor="waitlist-name" required>
              <Input
                id="waitlist-name"
                placeholder="Alex Johnson"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                required
              />
            </FormField>
            <FormField label="Store Name" htmlFor="waitlist-store" required>
              <Input
                id="waitlist-store"
                placeholder="Cloud Nine Vapes"
                value={form.storeName}
                onChange={(e) => set('storeName', e.target.value)}
                required
              />
            </FormField>
          </div>

          <FormField label="Email" htmlFor="waitlist-email" required>
            <Input
              id="waitlist-email"
              type="email"
              placeholder="you@store.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              autoComplete="email"
              required
            />
          </FormField>

          <FormField label="Phone Number" htmlFor="waitlist-phone">
            <Input
              id="waitlist-phone"
              type="tel"
              placeholder="(604) 555-0123"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              autoComplete="tel"
            />
          </FormField>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
            <Button type="button" variant="secondary" onClick={resetAndClose} className="flex-1">
              Close
            </Button>
            <Button type="submit" disabled={submitting} className="flex-1">
              {submitting ? 'Joining…' : 'Join the Waitlist'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

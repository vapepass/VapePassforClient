'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, KeyRound, ShieldCheck } from 'lucide-react';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input, InputGroup, InputIcon, FormField } from '@/components/ui/Input';
import { mockStore } from '@/data/mock';

export default function JoinProgram() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '', code: '' });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md animate-slide-up">
        <div className="flex flex-col items-center text-center mb-8">
          <Logo size={48} />
          <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mt-6 mb-2">{mockStore.name}</h1>
          <p className="text-body">Join our loyalty program</p>
        </div>

        <Card>
          {step === 1 && (
            <form
              className="space-y-5 animate-fade-in"
              onSubmit={(e) => { e.preventDefault(); if (form.name && form.phone) setStep(2); }}
            >
              <div className="px-4 py-3.5 rounded-xl text-sm flex items-center gap-3 bg-brand-50 text-brand-700 border border-brand-100">
                <ShieldCheck size={18} className="flex-shrink-0" aria-hidden="true" />
                Your ID was verified by our staff. Enter your details to get your card.
              </div>

              <FormField label="Full Name" htmlFor="name" required>
                <InputGroup>
                  <InputIcon><User size={16} /></InputIcon>
                  <Input id="name" className="pl-10" placeholder="Alex Johnson" value={form.name} onChange={(e) => set('name', e.target.value)} required />
                </InputGroup>
              </FormField>

              <FormField label="Phone Number" htmlFor="phone" required>
                <InputGroup>
                  <InputIcon><Phone size={16} /></InputIcon>
                  <Input id="phone" className="pl-10" placeholder="(604) 555-0123" value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
                </InputGroup>
              </FormField>

              <FormField label="Email (optional)" htmlFor="email">
                <InputGroup>
                  <InputIcon><Mail size={16} /></InputIcon>
                  <Input id="email" className="pl-10" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                </InputGroup>
              </FormField>

              <Button type="submit" className="w-full">Continue</Button>
            </form>
          )}

          {step === 2 && (
            <form
              className="space-y-5 animate-fade-in"
              onSubmit={(e) => { e.preventDefault(); router.push('/customer-card'); }}
            >
              <p className="text-sm text-body text-center">
                Enter the one-time code your cashier gave you. It expires in 10 minutes.
              </p>

              <FormField label="Verification Code" htmlFor="code" required>
                <InputGroup>
                  <InputIcon><KeyRound size={16} /></InputIcon>
                  <Input
                    id="code"
                    className="pl-10 text-center font-mono text-lg tracking-[0.3em]"
                    placeholder="000000"
                    maxLength={6}
                    inputMode="numeric"
                    value={form.code}
                    onChange={(e) => set('code', e.target.value)}
                    required
                  />
                </InputGroup>
              </FormField>

              <Button type="submit" className="w-full">Get My Card</Button>
              <Button type="button" variant="secondary" className="w-full" onClick={() => setStep(1)}>Back</Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { Check, ArrowRight, Calendar } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';
import { useComingSoon } from '@/components/ComingSoonProvider';

const planFeatures = [
  'AI Flavor Sommelier',
  'Compliance engine',
  'Palate profiling',
  'Live inventory sync',
  'Customer analytics',
  'Full dashboard access',
];

const initialForm = {
  storeName: 'Cloud Nine Vapes',
  ownerName: 'Alex Johnson',
  phone: '(555) 000-0000',
  startDate: '',
};

function PricingField({ id, label, type = 'text', value, onChange, placeholder, showCalendar = false }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#6b7280] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-11 px-4 text-[15px] text-[#111827] bg-white border border-[#e5e7eb] rounded-lg placeholder:text-[#9ca3af] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all"
        />
        {showCalendar && (
          <Calendar
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

export default function PricingSection() {
  const { openComingSoon } = useComingSoon();
  const [form, setForm] = useState(initialForm);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    openComingSoon();
  };

  return (
    <section className="py-20 sm:py-24 bg-[#f9fafb] font-sans">
      <div className="max-w-[640px] mx-auto px-6">
        <div className="text-center mb-12">
          <AnimateIn animation="slide-up">
            <h2 className="text-[2rem] sm:text-[2.375rem] font-bold text-[#111827] tracking-tight mb-3">
              Simple pricing
            </h2>
          </AnimateIn>
          <AnimateIn animation="slide-up" delay={100}>
            <p className="text-[#6b7280] text-base sm:text-lg">One plan. Everything included.</p>
          </AnimateIn>
        </div>

        <AnimateIn animation="scale-in" delay={200} duration={600}>
          <div className="rounded-2xl border border-brand-600 bg-white shadow-[0_6px_24px_rgba(124,58,237,0.1)] overflow-hidden">
            <div className="bg-brand-600 text-white text-center py-7 px-7">
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-[2.75rem] font-bold leading-none tracking-tight">$100</span>
                <span className="text-lg text-white/90 font-normal">/month</span>
              </div>
              <p className="text-sm text-white/90 mt-3">
                AI Sommelier · Compliance Engine · Full Dashboard
              </p>
            </div>

            <div className="px-8 py-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-3.5">
                {planFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[15px] text-[#374151]">
                    <Check size={16} className="text-brand-600 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="border-t border-[#e8e9ef] px-8 py-7">
              <h3 className="text-base font-bold text-[#111827] mb-5 tracking-tight">
                Get started — fill out your info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <PricingField
                  id="storeName"
                  label="Store Name"
                  value={form.storeName}
                  onChange={handleChange('storeName')}
                />
                <PricingField
                  id="ownerName"
                  label="Owner's Name"
                  value={form.ownerName}
                  onChange={handleChange('ownerName')}
                />
                <PricingField
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
                <PricingField
                  id="startDate"
                  label="When do you want to start?"
                  value={form.startDate}
                  onChange={handleChange('startDate')}
                  placeholder="dd/mm/yyyy"
                  showCalendar
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-colors"
              >
                Get Started — $100/mo
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

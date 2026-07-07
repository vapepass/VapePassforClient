'use client';
import { useState } from 'react';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';

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

const emptyForm = {
  storeName: '',
  ownerName: '',
  phone: '',
  startDate: '',
};

function validateForm(form) {
  const errors = {};

  if (!form.storeName.trim()) {
    errors.storeName = 'Store name is required.';
  }

  if (!form.ownerName.trim()) {
    errors.ownerName = "Owner's name is required.";
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[\d\s()+\-.]{7,}$/.test(form.phone.trim())) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!form.startDate.trim()) {
    errors.startDate = 'Start date is required.';
  } else if (
    !/^\d{4}-\d{2}-\d{2}$/.test(form.startDate)
    || Number.isNaN(new Date(`${form.startDate}T00:00:00`).getTime())
  ) {
    errors.startDate = 'Please select a valid date.';
  }

  return errors;
}

function formatDateForSheet(isoDate) {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

function PricingField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  min,
  error,
  required = false,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#6b7280] mb-2">
        {label}
        {required ? <span className="text-brand-600"> *</span> : null}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            'w-full h-11 px-4 text-[15px] text-[#111827] bg-white border rounded-lg placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all',
            type === 'date' ? '[color-scheme:light]' : '',
            error
              ? 'border-red-300 focus:border-red-400'
              : 'border-[#e5e7eb] focus:border-brand-500',
          ].join(' ')}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function PricingSection() {
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const webAppUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL;

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('error');
      setMessage('Please fill in all required fields.');
      return;
    }

    if (!webAppUrl) {
      setStatus('error');
      setMessage('Form submission is not configured. Please contact support.');
      return;
    }

    setFieldErrors({});
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          storeName: form.storeName.trim(),
          ownerName: form.ownerName.trim(),
          phone: form.phone.trim(),
          startDate: formatDateForSheet(form.startDate.trim()),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Submission failed. Please try again.');
      }

      setForm(emptyForm);
      setStatus('success');
      setMessage('Thanks! Your information has been submitted successfully.');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    }
  };

  const isSubmitting = status === 'loading';
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-[#f9fafb] font-sans">
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

            <form id="pricing-form" onSubmit={handleSubmit} className="border-t border-[#e8e9ef] px-8 py-7" noValidate>
              <h3 className="text-base font-bold text-[#111827] mb-5 tracking-tight">
                Get started — fill out your info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <PricingField
                  id="storeName"
                  label="Store Name"
                  value={form.storeName}
                  onChange={handleChange('storeName')}
                  error={fieldErrors.storeName}
                  required
                />
                <PricingField
                  id="ownerName"
                  label="Owner's Name"
                  value={form.ownerName}
                  onChange={handleChange('ownerName')}
                  error={fieldErrors.ownerName}
                  required
                />
                <PricingField
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  error={fieldErrors.phone}
                  required
                />
                <PricingField
                  id="startDate"
                  label="When do you want to start?"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange('startDate')}
                  min={today}
                  error={fieldErrors.startDate}
                  required
                />
              </div>

              {message ? (
                <p
                  role="status"
                  aria-live="polite"
                  className={[
                    'mb-4 text-sm leading-relaxed',
                    status === 'success' ? 'text-emerald-600' : 'text-red-600',
                  ].join(' ')}
                >
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Started — $100/mo
                    <ArrowRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

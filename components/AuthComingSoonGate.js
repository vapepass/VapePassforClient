'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';

/** Shown on auth routes while redirecting — routes users to pricing form */
export default function AuthComingSoonGate() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#pricing-form');
  }, [router]);

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

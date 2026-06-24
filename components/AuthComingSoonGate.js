'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useComingSoon } from '@/components/ComingSoonProvider';
import Spinner from '@/components/ui/Spinner';

/** Shown on auth routes while redirecting — opens the coming soon modal on the homepage */
export default function AuthComingSoonGate() {
  const router = useRouter();
  const { openComingSoon } = useComingSoon();

  useEffect(() => {
    openComingSoon();
    router.replace('/');
  }, [openComingSoon, router]);

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

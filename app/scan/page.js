'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Progress from '@/components/ui/Progress';
import Spinner from '@/components/ui/Spinner';
import { useToast } from '@/components/ui/Toast';
import { mockCustomers } from '@/data/mock';
import { ScanLine, CheckCircle, Plus, RotateCcw } from 'lucide-react';

export default function Scan() {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [stamps, setStamps] = useState(null);

  const mockScan = () => {
    setScanning(true);
    setTimeout(() => {
      const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
      setResult(customer);
      setStamps(customer.stamps);
      setScanning(false);
    }, 1200);
  };

  const addStamp = () => {
    if (stamps >= result.goal) return;
    const next = stamps + 1;
    setStamps(next);
    const msg = next >= result.goal
      ? `Reward earned! ${result.name} gets a free reward.`
      : `Stamp added — ${next}/${result.goal}`;
    toast(msg, next >= result.goal ? 'success' : 'info');
  };

  const reset = () => { setResult(null); setStamps(null); setScanning(false); };

  return (
    <DashboardLayout>
      <PageHeader
        title="Scan Customer"
        description="Scan the QR code on the customer's wallet pass"
      />

      <div className="max-w-md mx-auto">
        {!result ? (
          <Card>
            <div
              className="relative rounded-2xl overflow-hidden mb-6 bg-canvas border-2 border-line aspect-square"
              aria-label="Camera scanner viewfinder"
            >
              {[
                ['top-4 left-4', 'border-t-2 border-l-2'],
                ['top-4 right-4', 'border-t-2 border-r-2'],
                ['bottom-4 left-4', 'border-b-2 border-l-2'],
                ['bottom-4 right-4', 'border-b-2 border-r-2'],
              ].map(([pos, border]) => (
                <div key={pos} className={`absolute ${pos} w-8 h-8 ${border} rounded-sm border-brand-600`} aria-hidden="true" />
              ))}

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                {scanning ? (
                  <>
                    <Spinner size="lg" />
                    <p className="text-body text-sm font-medium">Scanning…</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center">
                      <ScanLine size={32} className="text-brand-600" aria-hidden="true" />
                    </div>
                    <p className="text-body text-sm text-center px-6">
                      Camera scanner ready<br />
                      Point at customer&apos;s wallet QR
                    </p>
                  </>
                )}
              </div>

              {scanning && (
                <div className="absolute left-6 right-6 h-0.5 bg-brand-600 top-1/2 animate-pulse" aria-hidden="true" />
              )}
            </div>

            <ol className="space-y-3 mb-6" aria-label="Scan instructions">
              {[
                'Customer opens Apple or Google Wallet',
                'Wallet card shows QR code on face',
                'Point device camera at QR code',
                'System identifies customer automatically',
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-body">
                  <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <Button onClick={mockScan} disabled={scanning} className="w-full">
              <ScanLine size={16} />
              {scanning ? 'Scanning…' : 'Simulate Scan'}
            </Button>
          </Card>
        ) : (
          <div className="animate-slide-up space-y-4">
            <Card>
              <div className="flex items-center gap-4 mb-5">
                <Avatar name={result.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-ink tracking-tight">{result.name}</p>
                  <p className="text-body text-sm">{result.phone}</p>
                </div>
                <Badge variant="success">
                  <CheckCircle size={11} className="mr-1" /> Verified
                </Badge>
              </div>

              <Progress value={stamps} max={result.goal} showLabel className="mb-5" />

              {stamps >= result.goal && (
                <p className="text-sm mb-4 font-medium text-warning-600">
                  Reward ready! Issue free reward.
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-6" aria-label={`${stamps} of ${result.goal} stamps`}>
                {Array.from({ length: result.goal }, (_, i) => (
                  <div
                    key={i}
                    className={[
                      'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                      i < stamps ? 'bg-brand-600 scale-100' : 'bg-line-subtle scale-95',
                    ].join(' ')}
                  >
                    {i < stamps && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              <Button onClick={addStamp} disabled={stamps >= result.goal} className="w-full">
                <Plus size={16} /> Add Stamp
              </Button>
            </Card>

            <Button onClick={reset} variant="secondary" className="w-full">
              <RotateCcw size={15} /> Scan Another Customer
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

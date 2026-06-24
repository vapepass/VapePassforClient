'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardTitle } from '@/components/ui/Card';
import Tabs from '@/components/ui/Tabs';
import Toggle from '@/components/ui/Toggle';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { Input, FormField } from '@/components/ui/Input';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { mockStore, mockBilling } from '@/data/mock';
import { Save, CheckCircle, CreditCard, Download, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function Settings() {
  const { toast } = useToast();
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ reward: true, join: true, stamp: false, weekly: true });

  const save = () => {
    setSaved(true);
    toast('Settings saved successfully', 'success');
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { id: 'profile', label: 'Business Profile' },
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Business Settings"
        description="Manage your store account, plan, and preferences"
      />

      <Tabs tabs={tabs} active={tab} onChange={setTab} className="mb-8" />

      <div className="max-w-2xl">
        {tab === 'profile' && (
          <Card className="animate-fade-in space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-line-subtle">
              <Avatar name={mockStore.name} size="xl" />
              <div>
                <p className="font-bold text-ink text-lg tracking-tight">{mockStore.name}</p>
                <label className="mt-2 inline-block cursor-pointer">
                  <Button variant="secondary" size="sm" as="span">Change Logo</Button>
                  <input type="file" className="hidden" accept="image/*" aria-label="Upload logo" />
                </label>
              </div>
            </div>

            {[
              { id: 'store-name', label: 'Store Name', defaultValue: mockStore.name },
              { id: 'email', label: 'Email', defaultValue: mockStore.email, type: 'email' },
              { id: 'phone', label: 'Phone', defaultValue: mockStore.phone, type: 'tel' },
              { id: 'address', label: 'Address', defaultValue: mockStore.address },
            ].map((f) => (
              <FormField key={f.id} label={f.label} htmlFor={f.id}>
                <Input id={f.id} type={f.type || 'text'} defaultValue={f.defaultValue} />
              </FormField>
            ))}

            <Button onClick={save} className="w-full">
              {saved ? <><CheckCircle size={15} /> Saved</> : <><Save size={15} /> Save Changes</>}
            </Button>
          </Card>
        )}

        {tab === 'billing' && (
          <div className="space-y-5 animate-fade-in">
            <Card className="border-brand-200 ring-1 ring-brand-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center shadow-sm">
                    <Zap size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-ink">Starter Plan</p>
                    <p className="text-body text-sm">$29 / month</p>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Next billing', value: 'July 1, 2025' },
                  { label: 'Payment method', value: 'Visa •••• 4242' },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-3.5 rounded-xl bg-canvas border border-line-subtle">
                    <p className="text-muted text-xs mb-1">{label}</p>
                    <p className="text-ink text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm"><CreditCard size={14} /> Update Payment</Button>
                <Button variant="danger" size="sm">Cancel Plan</Button>
              </div>
            </Card>

            <Card padding={false} className="overflow-hidden">
              <div className="px-6 py-4 border-b border-line">
                <CardTitle>Billing History</CardTitle>
              </div>
              <Table>
                <TableBody>
                  {mockBilling.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-xs text-muted">{b.id}</TableCell>
                      <TableCell>{b.date}</TableCell>
                      <TableCell className="font-semibold">{b.amount}</TableCell>
                      <TableCell><Badge variant="success">{b.status}</Badge></TableCell>
                      <TableCell>
                        <button className="p-2 rounded-lg text-muted hover:text-ink hover:bg-canvas transition-colors" aria-label={`Download invoice ${b.id}`}>
                          <Download size={14} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {tab === 'notifications' && (
          <Card className="animate-fade-in divide-y divide-line-subtle">
            {[
              { key: 'reward', title: 'Reward Earned', desc: 'Notify when a customer hits their stamp goal' },
              { key: 'join', title: 'New Customer Joined', desc: 'Notify when a customer joins your program' },
              { key: 'stamp', title: 'Stamp Added', desc: 'Notify on every stamp scan' },
              { key: 'weekly', title: 'Weekly Summary', desc: 'Weekly report with customer and stamp stats' },
            ].map(({ key, title, desc }) => (
              <div key={key} className="flex items-center justify-between py-5 first:pt-0 last:pb-0 gap-4">
                <div>
                  <p className="text-ink text-sm font-medium">{title}</p>
                  <p className="text-body text-xs mt-0.5">{desc}</p>
                </div>
                <Toggle
                  checked={notifs[key]}
                  onChange={(v) => setNotifs((n) => ({ ...n, [key]: v }))}
                  label={title}
                  id={`notif-${key}`}
                />
              </div>
            ))}
          </Card>
        )}

        {tab === 'security' && (
          <Card className="animate-fade-in space-y-6">
            <div>
              <h3 className="font-semibold text-ink mb-5">Change Password</h3>
              {['current', 'new', 'confirm'].map((id) => (
                <FormField
                  key={id}
                  label={id === 'current' ? 'Current Password' : id === 'new' ? 'New Password' : 'Confirm New Password'}
                  htmlFor={id}
                  className="mb-4"
                >
                  <Input id={id} type="password" placeholder="••••••••" autoComplete={id === 'current' ? 'current-password' : 'new-password'} />
                </FormField>
              ))}
              <Button onClick={save} className="w-full">
                {saved ? <><CheckCircle size={15} /> Updated</> : <><Save size={15} /> Update Password</>}
              </Button>
            </div>

            <div className="pt-6 border-t border-line-subtle">
              <h3 className="font-semibold text-ink mb-2">Two-Factor Authentication</h3>
              <p className="text-body text-xs mb-4">Add an extra layer of security to your account.</p>
              <Button variant="secondary" size="sm">Enable 2FA</Button>
            </div>

            <div className="pt-6 border-t border-line-subtle">
              <h3 className="font-semibold text-danger-600 mb-2">Danger Zone</h3>
              <p className="text-body text-xs mb-4">Permanently delete your account and all associated data.</p>
              <Button variant="danger" size="sm">Delete Account</Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { FilterPills } from '@/components/ui/Tabs';
import { mockActivity } from '@/data/mock';
import { Stamp, UserPlus, Award, Key, Filter } from 'lucide-react';

const extended = [
  ...mockActivity,
  { id: 7, type: 'code', customer: 'Drew Mackenzie', time: '2 days ago', detail: 'Age verification code issued — expires in 10 min', icon: 'code' },
  { id: 8, type: 'stamp', customer: 'Quinn Sharma', time: '3 days ago', detail: 'Stamp added — 9/10', icon: 'stamp' },
  { id: 9, type: 'join', customer: 'Blake Robertson', time: '4 days ago', detail: 'Joined loyalty program', icon: 'join' },
  { id: 10, type: 'code', customer: 'Skylar Okonkwo', time: '5 days ago', detail: 'Age verification code issued — expires in 10 min', icon: 'code' },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'stamp', label: 'Stamps' },
  { id: 'join', label: 'Joins' },
  { id: 'reward', label: 'Rewards' },
  { id: 'code', label: 'Verification' },
];

export default function ActivityLog() {
  const [filter, setFilter] = useState('all');

  const icons = {
    stamp: <Stamp size={15} className="text-brand-600" />,
    join: <UserPlus size={15} className="text-success-600" />,
    reward: <Award size={15} className="text-warning-600" />,
    code: <Key size={15} className="text-muted" />,
  };
  const colors = {
    stamp: 'bg-brand-50',
    join: 'bg-success-50',
    reward: 'bg-warning-50',
    code: 'bg-canvas',
  };

  const filtered = filter === 'all' ? extended : extended.filter((a) => a.type === filter);

  return (
    <DashboardLayout>
      <PageHeader
        title="Activity Log"
        description="Every stamp, join, reward, and verification code — logged for compliance"
      />

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Filter size={15} className="text-muted" aria-hidden="true" />
        <FilterPills options={filters} active={filter} onChange={setFilter} />
      </div>

      <Card padding>
        {filtered.length === 0 ? (
          <p className="text-body text-sm text-center py-12">No activity in this category yet.</p>
        ) : (
          filtered.map((a) => (
            <div key={a.id} className="flex items-center gap-3 py-4 border-b border-line-subtle last:border-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors[a.icon]}`}>
                {icons[a.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-ink text-sm font-medium">{a.customer}</p>
                <p className="text-body text-xs truncate mt-0.5">{a.detail}</p>
              </div>
              <time className="text-muted text-xs flex-shrink-0">{a.time}</time>
            </div>
          ))
        )}
      </Card>
    </DashboardLayout>
  );
}

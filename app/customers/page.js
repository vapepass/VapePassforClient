'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageHeader from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Modal from '@/components/ui/Modal';
import Progress, { StampProgress } from '@/components/ui/Progress';
import Button from '@/components/ui/Button';
import { Input, InputGroup, InputIcon } from '@/components/ui/Input';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { mockCustomers } from '@/data/mock';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const PER_PAGE = 8;

export default function Customers() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = mockCustomers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );
  const pages = Math.ceil(filtered.length / PER_PAGE);
  const slice = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <DashboardLayout>
      <PageHeader
        title="Customers"
        description={`${filtered.length} total members`}
      />

      <div className="relative mb-5 max-w-sm">
        <InputGroup>
          <InputIcon><Search size={16} /></InputIcon>
          <Input
            className="pl-10"
            placeholder="Search by name or phone…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            aria-label="Search customers"
          />
        </InputGroup>
      </div>

      <Card padding={false} className="overflow-hidden">
        <Table>
          <TableHead>
            <TableHeader>Customer</TableHeader>
            <TableHeader className="hidden sm:table-cell">Phone</TableHeader>
            <TableHeader>Stamps</TableHeader>
            <TableHeader className="hidden md:table-cell">Joined</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="w-16"><span className="sr-only">Actions</span></TableHeader>
          </TableHead>
          <TableBody>
            {slice.map((c) => (
              <TableRow key={c.id} onClick={() => setSelected(c)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} size="sm" />
                    <span className="font-medium">{c.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-body">{c.phone}</TableCell>
                <TableCell><StampProgress stamps={c.stamps} goal={c.goal} /></TableCell>
                <TableCell className="hidden md:table-cell text-body">
                  {new Date(c.joined).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                </TableCell>
                <TableCell>
                  <Badge variant={c.status}>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="min-h-8 h-8 text-brand-600" onClick={(e) => { e.stopPropagation(); setSelected(c); }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-5 py-4 border-t border-line">
          <p className="text-xs text-muted">
            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className="min-h-9 h-9 w-9"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              aria-label="Next page"
              className="min-h-9 h-9 w-9"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name} size="sm">
        {selected && (
          <div className="space-y-4 -mt-2">
            <div className="flex items-center gap-3 pb-4 border-b border-line-subtle">
              <Avatar name={selected.name} size="lg" />
              <div>
                <p className="text-body text-sm">{selected.email}</p>
                <Badge variant={selected.status} className="mt-1">
                  {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                </Badge>
              </div>
            </div>

            {[
              { label: 'Phone', value: selected.phone },
              { label: 'Joined', value: new Date(selected.joined).toLocaleDateString('en-CA', { dateStyle: 'long' }) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2 border-b border-line-subtle">
                <span className="text-body text-sm">{label}</span>
                <span className="text-ink text-sm font-medium">{value}</span>
              </div>
            ))}

            <Progress
              value={selected.stamps}
              max={selected.goal}
              showLabel
              size="md"
            />
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

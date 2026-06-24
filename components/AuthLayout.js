import Logo from '@/components/Logo';
import { Card } from '@/components/ui/Card';

export default function AuthLayout({ icon: Icon, title, subtitle, children, maxWidth = 'max-w-md' }) {
  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center px-4 py-12 sm:py-16">
      <div className={`w-full ${maxWidth} animate-slide-up`}>
        <div className="flex flex-col items-center text-center mb-8">
          <Logo size={48} />
          <div className="mt-6 w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-brand">
            <Icon size={22} className="text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mt-6 mb-2">{title}</h1>
          {subtitle && <p className="text-body text-base max-w-sm">{subtitle}</p>}
        </div>
        <Card className="shadow-md" padding>
          {children}
        </Card>
      </div>
    </div>
  );
}

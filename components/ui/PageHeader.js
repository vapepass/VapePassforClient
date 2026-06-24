export default function PageHeader({ title, description, action, badge }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-ink tracking-tight">{title}</h1>
          {badge}
        </div>
        {description && (
          <p className="text-body text-sm mt-1.5 max-w-2xl">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

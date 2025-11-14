interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({ label, value, subtitle, trend, className = '' }: StatCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-slate-600'
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border border-slate-200 p-6 ${className}`}>
      <p className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className={`text-3xl font-bold ${trend ? trendColors[trend] : 'text-slate-900'}`}>
        {value}
      </p>
      {subtitle && (
        <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
}

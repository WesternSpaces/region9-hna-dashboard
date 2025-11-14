interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({ label, value, subtitle, trend, className = '' }: StatCardProps) {
  // Detect if we're in a dark background context by checking className
  const isDark = className.includes('text-white') || className.includes('bg-white/10');

  const trendColors = {
    up: isDark ? 'text-green-400' : 'text-green-600',
    down: isDark ? 'text-red-400' : 'text-red-600',
    neutral: isDark ? 'text-slate-300' : 'text-slate-600'
  };

  const labelColor = isDark ? 'text-slate-200' : 'text-slate-600';
  const valueColor = isDark ? 'text-white' : 'text-slate-900';
  const subtitleColor = isDark ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-slate-200 p-6 ${className}`}>
      <p className={`text-sm font-medium uppercase tracking-wide mb-2 ${labelColor}`}>
        {label}
      </p>
      <p className={`text-3xl font-bold mb-2 ${trend ? trendColors[trend] : valueColor}`}>
        {value}
      </p>
      {subtitle && (
        <p className={`text-sm ${subtitleColor}`}>{subtitle}</p>
      )}
    </div>
  );
}

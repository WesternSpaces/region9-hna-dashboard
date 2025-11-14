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

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 p-6 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        {trend && (
          <span className={`text-xl ${trendColors[trend]}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
      <p className={`text-4xl font-extrabold mb-2 ${trend ? trendColors[trend] : 'text-slate-900'}`}>
        {value}
      </p>
      {subtitle && (
        <p className="text-sm text-slate-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

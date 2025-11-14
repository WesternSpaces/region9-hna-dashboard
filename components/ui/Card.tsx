interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

export function Card({ title, children, className = '', highlight = false }: CardProps) {
  const bgColor = highlight ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200' : 'bg-white border border-slate-200';

  return (
    <div className={`${bgColor} rounded-lg shadow-sm p-6 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-slate-900">{title}</h3>
      )}
      {children}
    </div>
  );
}

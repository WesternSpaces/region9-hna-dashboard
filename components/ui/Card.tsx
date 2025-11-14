interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

export function Card({ title, children, className = '', highlight = false }: CardProps) {
  const bgColor = highlight ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' : 'bg-white';

  return (
    <div className={`${bgColor} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 p-6 ${className}`}>
      {title && (
        <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">{title}</h3>
      )}
      {children}
    </div>
  );
}

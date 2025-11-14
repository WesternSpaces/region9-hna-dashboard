interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

export function Card({ title, children, className = '', highlight = false }: CardProps) {
  const bgColor = highlight ? 'bg-blue-50 border-blue-200' : 'bg-white';

  return (
    <div className={`${bgColor} rounded-lg shadow-md border p-6 ${className}`}>
      {title && (
        <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}

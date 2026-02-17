import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className,
  hover = true,
  padding = 'md',
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-xl border border-[var(--color-border)] transition-all duration-300',
        hover && 'hover:shadow-lg hover:-translate-y-0.5',
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

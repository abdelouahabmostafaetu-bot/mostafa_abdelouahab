interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            {/* Dot */}
            <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent-500 ring-4 ring-white dark:ring-gray-900" />

            {/* Content */}
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 mb-2">
                {item.year}
              </span>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="text-primary-800 dark:text-primary-300 font-medium">
                {item.institution}
              </p>
              {item.description && (
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

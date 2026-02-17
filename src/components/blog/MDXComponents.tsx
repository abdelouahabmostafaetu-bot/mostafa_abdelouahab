import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold mt-10 mb-4 font-heading text-[var(--color-text)]" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-bold mt-8 mb-3 font-heading text-[var(--color-text)]" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2 font-heading text-[var(--color-text)]" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 text-[var(--color-text-secondary)] leading-7" {...props}>
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-primary-800 dark:text-primary-300 underline underline-offset-2 hover:text-accent-500 transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-4 pl-6 list-disc text-[var(--color-text-secondary)]" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 pl-6 list-decimal text-[var(--color-text-secondary)]" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-1 leading-7" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-accent-500 pl-4 italic my-4 text-[var(--color-text-secondary)]"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code
        className="bg-surface-50 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6"
        {...props}
      >
        {children}
      </pre>
    ),
    img: ({ src, alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt || ''} className="rounded-lg my-6 mx-auto max-w-full" {...props} />
    ),
    hr: (props) => <hr className="border-[var(--color-border)] my-8" {...props} />,
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="bg-surface-50 dark:bg-gray-800 px-4 py-2 text-left font-semibold border border-[var(--color-border)]"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-2 border border-[var(--color-border)]" {...props}>
        {children}
      </td>
    ),
    // Custom components for math display
    Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: string }) => {
      const styles: Record<string, string> = {
        info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
        theorem: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800',
        definition: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      };
      return (
        <div className={`border-l-4 p-4 rounded-r-lg my-4 ${styles[type] || styles.info}`}>
          {children}
        </div>
      );
    },
    ...components,
  };
}

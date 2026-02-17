import Link from 'next/link';
import { Mail, BookOpen, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-50 dark:bg-gray-900 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-3">
              Abdelouahab Mostafa
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Master Student in Fundamental Mathematics at the University of Mila, Algeria.
              Researching dynamical systems, analysis, and topology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/about', label: 'About Me' },
                { href: '/research', label: 'Research' },
                { href: '/blog', label: 'Blog' },
                { href: '/resources', label: 'Resources' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-secondary)] hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-3">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="mailto:mostafaabdelouahab.etu@centre-univ-mila.dz"
                className="p-2 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-secondary)] hover:text-primary-800 dark:hover:text-primary-300 border border-[var(--color-border)] hover:border-primary-300 transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://www.researchgate.net/profile/Mostafa-Abdelouahab?ev=hdr_xprf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-secondary)] hover:text-primary-800 dark:hover:text-primary-300 border border-[var(--color-border)] hover:border-primary-300 transition-all"
                aria-label="ResearchGate"
              >
                <BookOpen size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-secondary)] hover:text-primary-800 dark:hover:text-primary-300 border border-[var(--color-border)] hover:border-primary-300 transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
            <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
              University of Mila<br />
              Mila, Algeria
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-secondary)]">
          <p>&copy; {currentYear} Abdelouahab Mostafa. All rights reserved.</p>
          <p className="mt-1">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

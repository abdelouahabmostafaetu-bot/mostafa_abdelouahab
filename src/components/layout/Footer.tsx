import Link from 'next/link';
import { Mail, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-center sm:text-left">
            <p className="font-bold text-[var(--color-text)] mb-1">Abdelouahab Mostafa</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Mathematics &middot; University of Mila, Algeria
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/blog" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
              Contact
            </Link>
            <a
              href="mailto:mostafaabdelouahab.etu@centre-univ-mila.dz"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-secondary)]">
          &copy; {currentYear} Abdelouahab Mostafa. Built with Next.js.
        </div>
      </div>
    </footer>
  );
}

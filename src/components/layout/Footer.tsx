import Link from 'next/link';
import { Mail, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* Subtle gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center sm:text-left">
            <p className="font-semibold text-[var(--color-text)] mb-1 tracking-tight">
              Abdelouahab Mostafa
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Fundamental Mathematics &middot; University of Mila
            </p>
          </div>

          {/* Right: Links & Socials */}
          <div className="flex items-center gap-5">
            <Link
              href="/blog"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200"
            >
              Contact
            </Link>
            <span className="w-px h-4 bg-[var(--color-border)]" />
            <a
              href="mailto:mostafaabdelouahab.etu@centre-univ-mila.dz"
              className="p-1.5 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-tertiary)]">
          <span>&copy; {currentYear} Abdelouahab Mostafa</span>
          <span className="flex items-center gap-1">
            Built with Next.js
            <ExternalLink size={10} className="opacity-50" />
          </span>
        </div>
      </div>
    </footer>
  );
}

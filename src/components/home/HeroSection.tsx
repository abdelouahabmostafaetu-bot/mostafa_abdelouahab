import { Mail, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        {/* Avatar */}
        <div className="mb-8">
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[var(--color-border)] shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile/main-photo.jpg"
              alt="Profile photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name & Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-3 tracking-tight">
          Abdelouahab Mostafa
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
          Master Student in Fundamental Mathematics &middot; University of Mila
        </p>

        {/* Short Bio */}
        <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-lg mx-auto mb-8">
          Exploring closed-form expressions, infinite series, and classical integrals.
          Passionate about the art of exact evaluation and deep structures within analysis.
        </p>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="/files/cv.pdf"
            className="px-6 py-2.5 bg-[var(--color-text)] text-[var(--color-bg)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Download CV
          </a>
          <Link
            href="/contact"
            className="px-6 py-2.5 border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors inline-flex items-center gap-2"
          >
            <Mail size={16} />
            Contact
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce text-[var(--color-text-secondary)]">
          <ArrowDown size={20} className="mx-auto" />
        </div>
      </div>
    </section>
  );
}

import { Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center pt-16">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        {/* Avatar with subtle ring */}
        <div className="mb-10 fade-in">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-[var(--color-border)] ring-offset-2 ring-offset-[var(--color-bg)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile/main-photo.jpg"
                alt="Abdelouahab Mostafa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Name & Title */}
        <div className="fade-in-up stagger-1">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4 tracking-tight leading-[1.15]">
            Abdelouahab Mostafa
          </h1>
        </div>

        <div className="fade-in-up stagger-2">
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-2 font-medium">
            Master Student in Fundamental Mathematics
          </p>
          <p className="text-sm text-[var(--color-text-tertiary)] mb-8">
            University of Mila, Algeria
          </p>
        </div>

        {/* Decorative divider */}
        <div className="fade-in-up stagger-3">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-8 h-px bg-[var(--color-border)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/40" />
            <span className="w-8 h-px bg-[var(--color-border)]" />
          </div>
        </div>

        {/* Short Bio */}
        <div className="fade-in-up stagger-3">
          <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-md mx-auto mb-10 text-[0.95rem]">
            Exploring closed-form expressions, infinite series, and classical integrals.
            Passionate about the art of exact evaluation and deep structures within analysis.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="fade-in-up stagger-4 flex items-center justify-center gap-3">
          <Link
            href="/contact"
            className="group px-6 py-2.5 bg-[var(--color-text)] text-[var(--color-bg)] rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[var(--color-text)]/10 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
          >
            <Mail size={15} />
            Get in Touch
          </Link>
          <Link
            href="/blog"
            className="group px-6 py-2.5 border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-text-secondary)] hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
          >
            Read Blog
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Research Interests */}
        <div className="fade-in-up stagger-5 mt-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Analysis', 'Dynamical Systems', 'Topology', 'Series & Integrals'].map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 text-xs text-[var(--color-text-tertiary)] bg-[var(--color-surface)] rounded-full border border-[var(--color-border)]/50"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

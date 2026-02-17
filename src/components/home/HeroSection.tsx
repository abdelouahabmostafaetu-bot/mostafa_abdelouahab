import { Mail, Download, BookOpen } from 'lucide-react';
import Button from '@/components/ui/Button';
import ScrollAnimation from '@/components/ui/ScrollAnimation';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Photo */}
          <ScrollAnimation animation="slide-in-left" className="flex-shrink-0">
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl ring-4 ring-primary-100 dark:ring-primary-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile/main-photo.jpg"
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold accent ring */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">∫</span>
              </div>
            </div>
          </ScrollAnimation>

          {/* Text Content */}
          <ScrollAnimation animation="slide-in-right" delay={200}>
            <div className="text-center md:text-left">
              <p className="text-accent-500 font-medium mb-2 tracking-wide uppercase text-sm">
                Master&apos;s Student in Mathematics
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4">
                Abdelouahab Mostafa
              </h1>
              <p className="text-lg md:text-xl text-primary-800 dark:text-primary-300 font-medium mb-3">
                Fundamental Mathematics &bull; University of Mila
              </p>
              <p className="text-[var(--color-text-secondary)] max-w-lg mb-6 leading-relaxed">
                Exploring the beauty of closed-form expressions, infinite series, and classical integrals.
                Passionate about the art of exact evaluation and the deep structures hidden within analysis.
              </p>

              {/* About Me */}
              <div className="bg-surface-50 dark:bg-gray-800 rounded-xl p-5 mb-6 border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  I am a Master&apos;s student in Fundamental Mathematics at the University of Mila, Algeria.
                  My mathematical passion lies in the exact evaluation of definite integrals and infinite series
                  — particularly famous and historically significant problems from classical analysis. I spend
                  much of my time investigating techniques such as contour integration, special function identities,
                  series acceleration, and creative substitutions to obtain closed-form results. I believe that
                  mathematics is at its most beautiful when a complex expression collapses into something
                  unexpectedly simple, and I use this website to share that beauty with others through articles,
                  problem solutions, and resources.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <Button href="/files/cv.pdf" variant="primary" size="lg">
                  <Download size={18} />
                  Download CV
                </Button>
                <Button href="mailto:mostafaabdelouahab.etu@centre-univ-mila.dz" variant="outline" size="lg">
                  <Mail size={18} />
                  Contact Me
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 mt-5 justify-center md:justify-start">
                <a
                  href="https://www.researchgate.net/profile/Mostafa-Abdelouahab?ev=hdr_xprf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-secondary)] hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
                  aria-label="ResearchGate"
                >
                  <BookOpen size={20} />
                </a>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

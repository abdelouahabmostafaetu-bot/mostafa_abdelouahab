import type { Metadata } from 'next';
import PublicationCard from '@/components/research/PublicationCard';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import publications from '@/content/publications.json';
import { Download, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Research',
  description: 'My publications, research projects, and master\'s thesis.',
};

export default function ResearchPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              Research
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              My publications, ongoing projects, and master&apos;s thesis
            </p>
          </div>
        </ScrollAnimation>

        {/* Master's Thesis */}
        <ScrollAnimation delay={100}>
          <section className="mb-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-6">
              Master&apos;s Thesis (Mémoire)
            </h2>
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-8 border border-primary-200 dark:border-primary-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-800 dark:bg-primary-600 rounded-lg text-white flex-shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-2">
                    On the Stability of Discrete Dynamical Systems in Metric Spaces
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                    <strong>Advisor:</strong> [Advisor Name]
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                    <strong>Institution:</strong> University of Mila, Algeria
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    <strong>Expected completion:</strong> June 2026
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    This thesis investigates the stability properties of discrete dynamical systems 
                    on complete metric spaces. We develop new sufficient conditions for asymptotic 
                    stability using fixed-point theorems and Lyapunov-type functions, generalizing 
                    classical results by relaxing smoothness requirements on the underlying maps.
                  </p>
                  <Button href="/files/thesis/memoire.pdf" variant="primary" size="sm">
                    <Download size={14} />
                    Download Thesis (PDF)
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* Current Research Projects */}
        <ScrollAnimation delay={200}>
          <section className="mb-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-6">
              Current Projects
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-[var(--color-border)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Stability Analysis via Generalized Lyapunov Functions
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Developing a framework for constructing generalized Lyapunov functions 
                  for discrete dynamical systems on non-compact metric spaces. This extends 
                  classical Lyapunov stability theory to broader classes of maps.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Lyapunov theory', 'metric spaces', 'stability'].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-[var(--color-border)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Topological Conjugacy Classification
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Investigating conditions under which two dynamical systems on topological 
                  spaces are topologically conjugate. Using symbolic dynamics to establish 
                  constructive conjugacy results for classes of expanding maps.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['topological dynamics', 'conjugacy', 'symbolic dynamics'].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* Publications */}
        <ScrollAnimation delay={300}>
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-6">
              Publications &amp; Preprints
            </h2>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <PublicationCard key={index} publication={pub} />
              ))}
            </div>
          </section>
        </ScrollAnimation>
      </div>
    </div>
  );
}

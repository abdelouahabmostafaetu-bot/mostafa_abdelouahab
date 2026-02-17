import type { Metadata } from 'next';
import { Download, FileText, BookOpen, Link2, GraduationCap } from 'lucide-react';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Downloadable resources including CV, lecture notes, problem sets, and useful links.',
};

const downloadables = [
  {
    title: 'Curriculum Vitae',
    description: 'My full academic CV with education, publications, and skills.',
    file: '/files/cv.pdf',
    icon: FileText,
    category: 'CV',
  },
  {
    title: 'Master Thesis',
    description: 'On the Stability of Discrete Dynamical Systems in Metric Spaces.',
    file: '/files/thesis/memoire.pdf',
    icon: GraduationCap,
    category: 'Thesis',
  },
  {
    title: 'Real Analysis — Lecture Notes',
    description: 'Comprehensive notes covering sequences, series, continuity, differentiation, and Riemann integration.',
    file: '/files/notes/real-analysis-notes.pdf',
    icon: BookOpen,
    category: 'Lecture Notes',
  },
  {
    title: 'Topology — Summary Notes',
    description: 'Key definitions, theorems, and examples from point-set topology.',
    file: '/files/notes/topology-notes.pdf',
    icon: BookOpen,
    category: 'Lecture Notes',
  },
  {
    title: 'Dynamical Systems — Problem Set',
    description: 'A collection of exercises on discrete dynamical systems covering fixed points, orbits, and stability.',
    file: '/files/notes/dynamical-systems-problems.pdf',
    icon: FileText,
    category: 'Problem Sets',
  },
];

const usefulLinks = [
  {
    title: 'arXiv — Mathematics',
    url: 'https://arxiv.org/list/math/recent',
    description: 'Preprint server for the latest mathematics research papers.',
  },
  {
    title: 'MathSciNet',
    url: 'https://mathscinet.ams.org/',
    description: 'Mathematical Reviews database by the American Mathematical Society.',
  },
  {
    title: 'Stack Exchange — Mathematics',
    url: 'https://math.stackexchange.com/',
    description: 'Q&A community for mathematics at all levels.',
  },
  {
    title: 'Overleaf',
    url: 'https://www.overleaf.com/',
    description: 'Online LaTeX editor for collaborative mathematical writing.',
  },
  {
    title: 'DLMF — Digital Library of Mathematical Functions',
    url: 'https://dlmf.nist.gov/',
    description: 'Comprehensive reference for special functions and their properties.',
  },
  {
    title: 'Paul\'s Online Math Notes',
    url: 'https://tutorial.math.lamar.edu/',
    description: 'Excellent free resource for calculus and differential equations.',
  },
];

export default function ResourcesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              Resources
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Downloadable files, lecture notes, and useful links for mathematics students
            </p>
          </div>
        </ScrollAnimation>

        {/* Downloadable Files */}
        <ScrollAnimation delay={100}>
          <section className="mb-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-6">
              Downloads
            </h2>
            <div className="space-y-4">
              {downloadables.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-800 dark:text-primary-300 flex-shrink-0">
                        <Icon size={20} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
                              {item.category}
                            </span>
                            <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mt-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                              {item.description}
                            </p>
                          </div>
                          <a
                            href={item.file}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary-800 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/50 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors flex-shrink-0"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download size={14} />
                            PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </ScrollAnimation>

        {/* Useful Links */}
        <ScrollAnimation delay={200}>
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-6">
              Useful Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {usefulLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <Card className="h-full">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-accent-100 dark:bg-accent-900 rounded-lg text-accent-600 dark:text-accent-400 flex-shrink-0 mt-0.5">
                        <Link2 size={16} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--color-text)] group-hover:text-primary-800 dark:group-hover:text-primary-300 transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        </ScrollAnimation>
      </div>
    </div>
  );
}

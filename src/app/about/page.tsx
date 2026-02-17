import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Timeline from '@/components/ui/Timeline';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import education from '@/content/education.json';
import { renderMDX } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about my academic background, research interests, and skills.',
};

const skills = [
  { name: 'LaTeX', level: 40 },
  { name: 'Python', level: 10 },
  { name: 'MATLAB', level: 45 },
  { name: 'Mathematical Writing', level: 5 },
  { name: 'English', level: 15 },
  { name: 'French', level: 35 },
  { name: 'Arabic', level: 70 },
];

export default async function AboutPage() {
  // Read biography markdown
  const bioPath = path.join(process.cwd(), 'src', 'content', 'bio.md');
  const bioContent = fs.readFileSync(bioPath, 'utf-8');
  const renderedBio = await renderMDX(bioContent);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              About Me
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              My academic journey, research interests, and the tools I use
            </p>
          </div>
        </ScrollAnimation>

        {/* Profile Section */}
        <ScrollAnimation delay={100}>
          <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
            {/* Photo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-[var(--color-border)] shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile/about-photo.jpg"
                  alt="About photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Bio */}
            <div className="prose-academic flex-grow">
              {renderedBio}
            </div>
          </div>
        </ScrollAnimation>

        {/* Education Timeline */}
        <ScrollAnimation delay={200}>
          <section className="mb-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8">
              Education
            </h2>
            <Timeline items={education} />
          </section>
        </ScrollAnimation>

        {/* Skills & Tools */}
        <ScrollAnimation delay={400}>
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8">
              Skills &amp; Languages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[var(--color-text)]">{skill.name}</span>
                    <span className="text-[var(--color-text-secondary)]">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-surface-50 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-800 to-accent-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollAnimation>
      </div>
    </div>
  );
}

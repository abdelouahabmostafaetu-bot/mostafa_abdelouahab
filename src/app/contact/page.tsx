'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Mail, MapPin, Building, Send, CheckCircle } from 'lucide-react';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Using Formspree — replace YOUR_FORM_ID with your actual Formspree form ID
      // Sign up at https://formspree.io and create a form to get your ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              Contact
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Feel free to reach out for academic collaborations, questions, or just to say hello
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <ScrollAnimation delay={100} className="lg:col-span-2">
            <div className="space-y-6">
              <Card hover={false}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-800 dark:text-primary-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">Email</h3>
                    <a
                      href="mailto:your.email@university.dz"
                      className="text-sm text-primary-800 dark:text-primary-300 hover:text-accent-500 transition-colors"
                    >
                      your.email@university.dz
                    </a>
                  </div>
                </div>
              </Card>

              <Card hover={false}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-800 dark:text-primary-300">
                    <Building size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">Office</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Department of Mathematics<br />
                      University of Mila
                    </p>
                  </div>
                </div>
              </Card>

              <Card hover={false}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-800 dark:text-primary-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">Address</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      University of Mila<br />
                      Mila, Algeria
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation delay={200} className="lg:col-span-3">
            <Card hover={false} padding="lg">
              {status === 'sent' ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm text-primary-800 dark:text-primary-300 hover:text-accent-500 transition-colors font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--color-text)] mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-white dark:bg-gray-800 text-[var(--color-text)] focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-400 focus:border-transparent transition-all text-sm"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--color-text)] mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-white dark:bg-gray-800 text-[var(--color-text)] focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-400 focus:border-transparent transition-all text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[var(--color-text)] mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-white dark:bg-gray-800 text-[var(--color-text)] focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-400 focus:border-transparent transition-all text-sm"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--color-text)] mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-white dark:bg-gray-800 text-[var(--color-text)] focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-400 focus:border-transparent transition-all text-sm resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-500">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status === 'sending'}
                  >
                    <Send size={16} />
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}

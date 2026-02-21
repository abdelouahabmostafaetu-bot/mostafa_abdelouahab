'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

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
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            Contact
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Feel free to reach out for collaborations, questions, or to say hello.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-6 mb-10 text-sm">
          <a
            href="mailto:mostafaabdelouahab.etu@centre-univ-mila.dz"
            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            <Mail size={16} />
            mostafaabdelouahab.etu@centre-univ-mila.dz
          </a>
          <span className="flex items-center gap-2 text-[var(--color-text-secondary)]">
            <MapPin size={16} />
            University of Mila, Algeria
          </span>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-[var(--color-border)] p-6">
          {status === 'sent' ? (
            <div className="text-center py-8">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">
                Message Sent!
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Thank you. I&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-[var(--color-accent)] hover:opacity-80 transition-opacity font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-sm transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-sm transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-sm transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent text-sm resize-none transition-all"
                  placeholder="Your message..."
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-500">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--color-text)] text-[var(--color-bg)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send size={16} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

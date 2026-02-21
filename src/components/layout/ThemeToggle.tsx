'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={toggle}
      className="p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'slide-in-left' | 'slide-in-right';
  delay?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  animation = 'fade-in-up',
  delay = 0,
  className,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'none'
          : animation === 'fade-in-up'
          ? 'translateY(20px)'
          : animation === 'slide-in-left'
          ? 'translateX(-20px)'
          : animation === 'slide-in-right'
          ? 'translateX(20px)'
          : 'none',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

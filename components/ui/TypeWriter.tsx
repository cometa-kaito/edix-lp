'use client';

import { useEffect, useState } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypeWriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayed(text);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay, text, onComplete]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      // Skip HTML tags
      let next = i;
      while (next < text.length && text[next - 1] === '<') {
        const closeIndex = text.indexOf('>', next);
        if (closeIndex !== -1) {
          next = closeIndex + 1;
          i = next;
        } else {
          break;
        }
      }
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: displayed + (displayed.length < text.length && started ? '<span class="type-cursor">|</span>' : '') }}
    />
  );
}

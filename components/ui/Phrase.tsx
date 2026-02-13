'use client';

import { useMemo } from 'react';
import { loadDefaultJapaneseParser } from 'budoux';

const parser = loadDefaultJapaneseParser();

interface PhraseProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

export default function Phrase({ children, as: Tag = 'span', className }: PhraseProps) {
  const segments = useMemo(() => parser.parse(children), [children]);

  return (
    <Tag className={className} style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
      {segments.map((seg, i) => (
        <span key={i} style={{ display: 'inline-block' }}>
          {seg}
        </span>
      ))}
    </Tag>
  );
}

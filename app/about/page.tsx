import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import Results from '@/components/sections/Results';

export const metadata: Metadata = siteMetadata.about;

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 'var(--header-h)' }}>
      <Results />
    </div>
  );
}

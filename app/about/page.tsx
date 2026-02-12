import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import Team from '@/components/sections/Team';
import TechSafety from '@/components/sections/TechSafety';
import Results from '@/components/sections/Results';
import LiveDemo from '@/components/sections/LiveDemo';

export const metadata: Metadata = siteMetadata.about;

export default function AboutPage() {
  return (
    <>
      <div style={{ paddingTop: 'var(--header-h)' }} />
      <Team />
      <TechSafety />
      <Results />
      <LiveDemo />
    </>
  );
}

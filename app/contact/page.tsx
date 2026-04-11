import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/metadata';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = siteMetadata.contact;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <>
      <div style={{ paddingTop: 'var(--header-h)' }} />
      <ContactSection defaultCategory={category} />
    </>
  );
}

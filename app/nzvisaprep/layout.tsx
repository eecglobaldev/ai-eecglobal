import type { Metadata } from 'next';

export const metadata: Metadata = {
    // Additional metadata that can't be in page.tsx
    other: {
        // Sitemap references are handled via robots.txt and sitemap.xml
        // LLMs.txt and security.txt are static files that should be in public/
    },
};

export default function NzVisaPrepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



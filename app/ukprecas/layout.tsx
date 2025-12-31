import type { Metadata } from 'next';

export const metadata: Metadata = {
    // Additional metadata handled in page.tsx
};

export default function UkPrecasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


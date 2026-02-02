import type { Metadata } from 'next';

export const metadata: Metadata = {
  other: {},
};

export default function CareerCounselorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

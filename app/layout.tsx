import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/features/shared/context/ThemeContext";
import StructuredData from "@/features/shared/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EEC AI Tools | Free Visa Interview Prep, PR Calculators & Study Abroad AI Agents",
  description: "EEC AI Tools: The #1 free platform for Indian students. Practice USA F-1 & Australia Genuine Student (GS) visa interviews with AI, calculate German GPA & Australia PR points, and access verified 2026 career counseling.",
  keywords: ["EEC", "EEC Study Abroad", "AI Visa Interview Prep", "USA F1 Visa Mock Interview AI", "Australia Genuine Student Test Practice", "German Grade Calculator India", "Australia PR Points Calculator 189 190", "Study Abroad Career Counseling AI", "UK CAS Interview Questions", "New Zealand Student Visa Interview Guide", "Free Study Abroad Tools"],
  authors: [{ name: "EEC" }],
  creator: "EEC",
  publisher: "EEC",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    url: "https://ai.eecglobal.com/",
    title: "EEC AI Tools | Master Your Visa Interview & Career Strategy",
    description: "Stop guessing. Start winning. Use EEC's free AI agents to practice strict visa interviews (USA, AU, UK, NZ) and calculate your eligibility instantly.",
    siteName: "EEC AI Tools",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EEC AI Tools - Master Your Visa Interview & Career Strategy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EEC AI Tools | The AI Advantage for Study Abroad",
    description: "Don't risk rejection. Practice with EEC's AI Visa Officer and finding high-ROI courses for 2026. 100% Free.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/assets/logos/eeclogo-main.png", sizes: "400x400", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/assets/logos/eeclogo-main.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [
      { url: "/assets/logos/eeclogo-main.png", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "EEC AI",
  },
  metadataBase: new URL("https://ai.eecglobal.com"),
  alternates: {
    canonical: "https://ai.eecglobal.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased selection:bg-blue-500/30">
        <StructuredData />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

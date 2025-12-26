import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/features/shared/context/ThemeContext";

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
  description: "EEC AI Tools: The #1 free platform for Indian students. Practice USA F-1 & Australia Genuine Student (GS) visa interviews with AI.",
  keywords: ["EEC", "Study Abroad", "AI Visa Prep", "USA F1", "Australia GS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased selection:bg-blue-500/30">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

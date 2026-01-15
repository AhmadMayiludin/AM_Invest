import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Sidebar, Footer } from "@/components/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AM Invest - All-in-One Investor Tools",
  description: "Website interaktif untuk investor ritel di Indonesia, khususnya Gen Z, dengan kalkulator esensial, desain modern, dan performa tinggi.",
  keywords: ["investasi", "saham", "kalkulator", "average down", "rights issue", "dividen", "valuasi", "Indonesia"],
  authors: [{ name: "Ahmad Mayiludin" }],
  openGraph: {
    title: "AM Invest - All-in-One Investor Tools",
    description: "Tools investasi untuk Gen Z Indonesia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col bg-background">
          {/* Animated gradient background */}
          <div className="fixed inset-0 -z-10 animated-gradient opacity-50" />

          {/* Grid pattern overlay */}
          <div
            className="fixed inset-0 -z-10 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Navbar */}
          <Navbar />

          {/* Main content area with sidebar */}
          <div className="flex-1 flex">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Page content */}
            <main className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
                {children}
              </div>
            </main>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}

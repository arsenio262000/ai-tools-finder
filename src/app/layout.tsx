import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast';
import { ChatBot } from '@/components/ChatBot';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find Next AI - Find the Perfect AI Tools for Your Workflow",
  description: "Discover and compare the best tools for productivity, creativity, and more. Expert reviews and recommendations to help you choose the right tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <ChatBot />
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}

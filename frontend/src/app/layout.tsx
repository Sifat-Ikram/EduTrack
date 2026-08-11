import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "EduAyna | Student Management",
  description: "Student Management Dashboard for EduAyna",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Providers>
          <main className="max-w-6xl mx-auto px-4 py-6 md:px-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
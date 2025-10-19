// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Component Inventory",
  description: "A clean Next.js layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Component Inventory</h1>
            <nav className="space-x-4">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link href="/Dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-inner mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Component Inventory All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

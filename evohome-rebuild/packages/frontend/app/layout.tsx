import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EvoHome Improvements',
  description: 'Home improvements that save energy and boost comfort across the UK.',
  openGraph: { title: 'EvoHome Improvements', type: 'website' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex gap-6">
            <a href="/" className="font-semibold">EvoHome</a>
            <nav className="flex gap-4">
              <a href="/services">Services</a>
              <a href="/blog">Blog</a>
              <a href="/gallery">Gallery</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
            © {new Date().getFullYear()} EvoHome Improvements
          </div>
        </footer>
      </body>
    </html>
  );
}

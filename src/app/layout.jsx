// src/app/layout.jsx
'use client';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react'; 
import './globals.css'; 

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto py-8">
      <div className="container mx-auto px-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <p className="mb-2">
          <strong>Disclaimer:</strong> Aplikasi ini adalah alat bantu dan tidak menggantikan diagnosis medis profesional.
          Selalu konsultasikan dengan dokter atau tenaga kesehatan yang berkualifikasi untuk diagnosis dan penanganan yang akurat.
        </p>
        <p>
          © {new Date().getFullYear()} NeuroDerma. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <html lang="id" className={inter.variable}>
      <head>
        <title>NeuroDerma - Sistem Deteksi Penyakit Kulit</title>
        <meta name="description" content="Unggah gambar kulit Anda untuk mendapatkan analisis awal menggunakan teknologi AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`flex flex-col min-h-screen bg-background text-foreground antialiased ${inter.className}`}>
        <header 
          className="sticky top-0 z-50 shadow-sm 
                     bg-gradient-to-r from-white via-sky-100 to-cyan-200"
        >
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <Link href="/" className="flex flex-col sm:flex-row items-center group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative mb-1 sm:mb-0 sm:mr-2.5 transform group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/neuroderma.png" 
                  alt="Logo NeuroDerma"
                  fill 
                  sizes="(max-width: 639px) 40px, 48px" 
                  className="object-contain" 
                  priority 
                />
              </div>
              <span 
                className="text-xl sm:text-2xl font-bold 
                           text-transparent bg-clip-text bg-gradient-to-r 
                           from-blue-700 to-indigo-800"
              >
                NeuroDerma
              </span>
            </Link>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                aria-label="Toggle Menu"
                aria-expanded={isMobileMenuOpen}
                className="p-2 rounded-md text-sky-700 hover:text-sky-900 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-300 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-5 lg:space-x-7"> 
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors">
                Beranda
              </Link>
              <Link href="/tentang-kami" className="px-3 py-2 rounded-md text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors">
                Tentang Kami
              </Link>
              <Link href="/faq" className="px-3 py-2 rounded-md text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors">
                FAQ
              </Link>
            </div>
          </nav>

          {isMobileMenuOpen && ( 
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-100"> 
              <div className="container mx-auto px-4 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-sky-700 hover:bg-sky-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)} 
                >
                  Beranda
                </Link>
                <Link
                  href="/tentang-kami"
                  className="block px-3 py-2 rounded-md text-base font-medium text-sky-700 hover:bg-sky-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tentang Kami
                </Link>
                <Link
                  href="/faq"
                  className="block px-3 py-2 rounded-md text-base font-medium text-sky-700 hover:bg-sky-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </div>
            </div>
          )}
        </header>
        
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}

// src/app/layout.jsx
'use client'; 

import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react'; 
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto py-8">
      <div className="container mx-auto px-4 text-center text-xs text-gray-500">
        <p className="mb-2">
          <strong>Disclaimer:</strong> Aplikasi ini adalah alat bantu dan tidak menggantikan diagnosis medis profesional.
          Selalu konsultasikan dengan dokter atau tenaga kesehatan yang berkualifikasi untuk diagnosis dan penanganan yang akurat.
        </p>
        <p>
          © {new Date().getFullYear()} Sistem Deteksi Penyakit Kulit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <html lang="id">
      <head>
        <title>Sistem Deteksi Penyakit Kulit</title>
        <meta name="description" content="Unggah gambar kulit Anda untuk mendapatkan analisis awal." />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <header className="bg-white shadow-md sticky top-0 z-50"> 
          <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="flex flex-col items-center sm:flex-row text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative mb-1 sm:mb-0 sm:mr-2">
                <Image
                  src="/neuroderma.png" 
                  alt="Logo NeuroDerma"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 text-center sm:text-left text-lg sm:text-xl">
                NeuroDerma
              </span>
            </Link>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                aria-label="Toggle Menu"
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-6"> 
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Beranda
              </Link>
              <Link href="/tentang-kami" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Tentang Kami
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                FAQ
              </Link>
            </div>
          </nav>

          {isMobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-40"> {/* top-full untuk di bawah header */}
              <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)} 
                >
                  Beranda
                </Link>
                <Link
                  href="/tentang-kami"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tentang Kami
                </Link>
                <Link
                  href="/faq"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </div>
            </div>
          )}
        </header>

        <main className="flex-grow container mx-auto px-4 py-8"> 
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
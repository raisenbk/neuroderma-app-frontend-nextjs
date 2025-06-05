// src/app/layout.jsx
'use client'; // Diperlukan karena kita menggunakan useState untuk menu mobile

import { Inter } from 'next/font/google'; // Atau font lain yang Anda gunakan
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react'; // Impor useState dan useEffect
import './globals.css'; // Pastikan ini mengarah ke file globals.css yang benar
// import './style.css'; // Pastikan ini mengarah ke file globals.css yang benar

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // Opsional: jika Anda ingin menggunakan Inter via variabel CSS
});

// Komponen Footer (bisa dipisah ke file sendiri jika kompleks)
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
    setIsMounted(true); // Setelah komponen ter-mount, set isMounted menjadi true
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Komentar atau whitespace di sini sebelum return <html> bisa jadi sumber masalah.
  // Kita akan pastikan return JSX se-rapat mungkin.

  return (
    <html lang="id" className={inter.variable /* Pastikan tidak ada spasi ekstra di sini */}>
      <head>
        {/* Metadata bisa diletakkan di sini atau menggunakan generateMetadata jika ini Server Component */}
        <title>NeuroDerma - Sistem Deteksi Penyakit Kulit</title>
        <meta name="description" content="Unggah gambar kulit Anda untuk mendapatkan analisis awal menggunakan teknologi AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Favicon links (contoh) */}
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
      </head>
      <body className={`flex flex-col min-h-screen bg-background text-foreground antialiased ${inter.className}`}>
        <header 
          className="sticky top-0 z-50 shadow-lg 
                     bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 
                     animate-gradient-xy text-white" // Pastikan ada warna teks default untuk header
        >
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <Link href="/" className="flex flex-col sm:flex-row items-center group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative mb-1 sm:mb-0 sm:mr-2.5 transform group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/neuroderma.png" // PASTIKAN PATH INI BENAR dan gambar ada di /public
                  alt="Logo NeuroDerma"
                  fill // Menggantikan layout="fill"
                  sizes="(max-width: 639px) 40px, 48px" // Prop sizes untuk optimasi dengan fill
                  className="object-contain" // Menggantikan objectFit="contain"
                  priority // Penting untuk LCP jika logo adalah bagian penting
                />
              </div>
              <span 
                className="text-xl sm:text-2xl font-bold 
                           text-transparent bg-clip-text bg-gradient-to-r 
                           from-white via-sky-100 to-cyan-100 
                           group-hover:from-sky-100 group-hover:to-white
                           transition-all duration-300 text-center sm:text-left"
              >
                NeuroDerma
              </span>
            </Link>

            {/* Tombol Hamburger untuk Mobile */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                aria-label="Toggle Menu"
                aria-expanded={isMobileMenuOpen}
                className="p-2 rounded-md text-gray-100 hover:text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-300 transition-colors"
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

            {/* Navigasi untuk Desktop */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-7"> 
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-sky-100 hover:bg-sky-600 hover:text-white transition-colors">
                Beranda
              </Link>
              <Link href="/tentang-kami" className="px-3 py-2 rounded-md text-sm font-medium text-sky-100 hover:bg-sky-600 hover:text-white transition-colors">
                Tentang Kami
              </Link>
              <Link href="/faq" className="px-3 py-2 rounded-md text-sm font-medium text-sky-100 hover:bg-sky-600 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </nav>

          {/* Menu Mobile Dropdown */}
          {isMobileMenuOpen && ( // Hanya render jika isMobileMenuOpen true
            <div className="md:hidden absolute top-full left-0 right-0 bg-sky-500 shadow-xl z-40 border-t border-sky-400"> 
              <div className="container mx-auto px-4 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)} 
                >
                  Beranda
                </Link>
                <Link
                  href="/tentang-kami"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tentang Kami
                </Link>
                <Link
                  href="/faq"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-600 transition-colors"
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

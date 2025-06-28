// src/app/layout.jsx
'use client';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import './globals.css';

import '../i18n'; 
import { useTranslation } from 'react-i18next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// --- KODE ICON LENGKAP ---
function SunIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.93 19.07 1.41-1.41" />
      <path d="m17.66 6.34 1.41-1.41" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function LanguageIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}


function ThemeToggleButton({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="p-2 rounded-full text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-sky-400 transition-colors duration-200"
    >
      {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
}

function LanguageToggleButton({ onToggle, language }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle language"
      className="p-2 rounded-full text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-sky-400 transition-colors duration-200"
    >
        <div className="relative">
            <LanguageIcon className="h-5 w-5" />
            <span className="absolute -bottom-1 -right-2 text-xs font-bold text-sky-800 dark:text-sky-200">
                {language.toUpperCase()}
            </span>
        </div>
    </button>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-100 dark:bg-gray-600 border-t border-gray-200 dark:border-gray-700 mt-auto py-8">
      <div className="container mx-auto px-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <p className="mb-2">
          <strong>{t('footer_disclaimer_title')}</strong> {t('footer_disclaimer_text')}
        </p>
        <p>
          {t('footer_copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLanguageSwitch = () => {
    const newLang = i18n.language.startsWith('id') ? 'en' : 'id';
    i18n.changeLanguage(newLang);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <html lang={i18n.language} className={inter.variable}>
      <head>
        <title>NeuroDerma - Sistem Deteksi Penyakit Kulit</title>
        <meta name="description" content="Unggah gambar kulit Anda untuk mendapatkan analisis awal menggunakan teknologi AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 antialiased ${inter.className}`}>
        <header
          className="sticky top-0 z-50 shadow-sm 
                     bg-gradient-to-r from-white via-sky-100 to-cyan-200
                     dark:from-gray-900 dark:via-sky-950 dark:to-indigo-950
                     border-b border-gray-200 dark:border-gray-800"
        >
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <Link href="/" className="flex flex-col sm:flex-row items-center group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative mb-1 sm:mb-0 sm:mr-2.5 transform group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/neurodermadarkmode.png"
                    alt="Logo NeuroDerma"
                    fill
                    sizes="(max-width: 639px) 40px, 48px" 
                    className="object-contain dark:block" 
                    priority 
                  />
                  <Image
                    src="/neuroderma.png" 
                    alt="Logo NeuroDerma"
                    fill
                    sizes="(max-width: 639px) 40px, 48px" 
                    className="object-contain dark:hidden" 
                    priority 
                  />
              </div>
              <span
                className="text-xl sm:text-2xl font-bold 
                           text-transparent bg-clip-text bg-gradient-to-r 
                           from-blue-700 to-indigo-800
                           dark:from-sky-400 dark:to-cyan-300"
              >
                NeuroDerma
              </span>
            </Link>

            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-5 lg:space-x-7 mr-2">
                <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white transition-colors">
                  {t('nav_home')}
                </Link>
                <Link href="/tentang-kami" className="px-3 py-2 rounded-md text-sm font-medium text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white transition-colors">
                  {t('nav_about')}
                </Link>
                <Link href="/faq" className="px-3 py-2 rounded-md text-sm font-medium text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white transition-colors">
                  {t('nav_faq')}
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                <LanguageToggleButton onToggle={handleLanguageSwitch} language={i18n.language.split('-')[0]} />
                <ThemeToggleButton theme={theme} onToggle={handleThemeSwitch} />
              </div>

              <div className="md:hidden ml-3">
                <button
                  onClick={toggleMobileMenu}
                  aria-label="Toggle Menu"
                  aria-expanded={isMobileMenuOpen}
                  className="p-2 rounded-md text-sky-700 dark:text-sky-300 hover:text-sky-900 hover:bg-sky-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-300 transition-colors"
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
            </div>
          </nav>

          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-40 border-t border-gray-100 dark:border-gray-700">
              <div className="container mx-auto px-4 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-gray-700 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav_home')}
                </Link>
                <Link href="/tentang-kami" className="block px-3 py-2 rounded-md text-base font-medium text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-gray-700 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav_about')}
                </Link>
                <Link href="/faq" className="block px-3 py-2 rounded-md text-base font-medium text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-gray-700 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav_faq')}
                </Link>
              </div>
            </div>
          )}
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

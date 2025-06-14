// src/app/faq/page.jsx
'use client';

import Link from 'next/link';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import FaqAccordion from '@/components/FaqAccordion'; 
import '../../i18n'; 

export default function FAQPage() {
  const { t } = useTranslation();

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950 min-h-[calc(100vh-150px)]">
      <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-lg p-8 sm:p-12 rounded-xl shadow-2xl max-w-3xl mx-auto ring-1 ring-slate-200 dark:ring-slate-700">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 mx-auto mb-4 text-blue-500 dark:text-blue-400" /> 
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400">
              {t('faq_page_title')}
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300"> 
            {t('faq_page_subtitle')}
          </p>
        </div>

        <FaqAccordion />

        <div className="mt-12 text-center">
          <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center w-full max-w-sm px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold shadow-md rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-teal-600 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('faq_back_button')}
              </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

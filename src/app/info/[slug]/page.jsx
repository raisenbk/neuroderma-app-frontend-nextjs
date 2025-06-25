// src/app/info/[slug]/page.jsx
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Info, ArrowLeft } from 'lucide-react';
import DiseaseInfoAccordion from '@/components/DiseaseInfoAccordion';
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const diseaseDataStructure = [
  {
    nameKey: "disease_chickenpox_name",
    slug: "chickenpox",
    symptomsKey: "disease_chickenpox_symptoms_detail",
    causesKey: "disease_chickenpox_causes_detail",
    transmissionKey: "disease_chickenpox_transmission_detail",
    preventionKey: "disease_chickenpox_prevention_detail",
    whenToSeeDoctorKey: "disease_chickenpox_whentoseedoctor_detail",
  },
  {
    nameKey: "disease_measles_name",
    slug: "measles",
    symptomsKey: "disease_measles_symptoms_detail",
    causesKey: "disease_measles_causes_detail",
    transmissionKey: "disease_measles_transmission_detail",
    preventionKey: "disease_measles_prevention_detail",
    whenToSeeDoctorKey: "disease_measles_whentoseedoctor_detail",
  },
  {
    nameKey: "disease_monkeypox_name",
    slug: "monkeypox",
    symptomsKey: "disease_monkeypox_symptoms_detail",
    causesKey: "disease_monkeypox_causes_detail",
    transmissionKey: "disease_monkeypox_transmission_detail",
    preventionKey: "disease_monkeypox_prevention_detail",
    whenToSeeDoctorKey: "disease_monkeypox_whentoseedoctor_detail",
  },
];


export default function DiseasePage() {
  const { t } = useTranslation();
  const params = useParams();
  const slug = params.slug;

  const diseaseInfoKeys = diseaseDataStructure.find(d => d.slug === slug);

  if (!diseaseInfoKeys) {
    return (
      <main className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t('info_page_not_found_title')}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">{t('info_page_not_found_subtitle', { slug })}</p>
        <Link href="/" className="mt-6 inline-block bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 transition-colors">
          {t('info_page_back_button')}
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <header className="py-12 sm:py-16 bg-gradient-to-br from-sky-500 to-teal-400 dark:from-indigo-600 dark:to-cyan-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-4 bg-white/20 dark:bg-white/10 rounded-2xl mb-4">
            <Info className="w-12 h-12 mx-auto text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t(diseaseInfoKeys.nameKey)}
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full">
          <DiseaseInfoAccordion data={diseaseInfoKeys} />
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-3 bg-sky-600 dark:bg-sky-500 text-white font-bold rounded-full shadow-lg hover:bg-sky-700 dark:hover:bg-sky-400 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('info_page_back_button')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

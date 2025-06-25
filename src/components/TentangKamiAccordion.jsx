// src/components/TentangKamiAccordion.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lightbulb, ShieldCheck, Mail, AlertTriangle, ChevronDown } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next'; 

export default function TentangKamiAccordion() {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState('misi');

  const sections = [
    {
      id: 'misi',
      title: t('about_accordion_mission_title'),
      icon: Lightbulb,
      iconClassName: 'bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400',
      content: <p>{t('about_accordion_mission_content')}</p>,
    },
    {
      id: 'teknologi',
      title: t('about_accordion_tech_title'),
      icon: ShieldCheck,
      iconClassName: 'bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400',
      content: <p dangerouslySetInnerHTML={{ __html: t('about_accordion_tech_content') }} />,
    },
    {
      id: 'disclaimer',
      title: t('about_accordion_disclaimer_title'),
      icon: AlertTriangle,
      iconClassName: 'bg-red-200 text-red-600 dark:bg-red-900/50 dark:text-red-400',
      content: (
        <>
          <p className="font-semibold text-red-800 dark:text-red-300" dangerouslySetInnerHTML={{ __html: t('about_accordion_disclaimer_content_1') }} />
          <p className="mt-2 text-red-700 dark:text-red-400">{t('about_accordion_disclaimer_content_2')}</p>
        </>
      ),
    },
    {
      id: 'kontak',
      title: t('about_accordion_contact_title'),
      icon: Mail,
      iconClassName: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400',
      content: (
        <p>
          <Trans i18nKey="about_accordion_contact_content">
            Kami sangat menghargai masukan Anda. Hubungi kami melalui <a href="mailto:dmanusia69@gmail.com" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">email</a>.
          </Trans>
        </p>
      ),
    },
  ];

  const handleToggle = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-slate-200/60 dark:ring-slate-700/60">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
          <button
            onClick={() => handleToggle(section.id)}
            className="flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50/50 dark:hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-colors"
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-full ${section.iconClassName}`}>
                <section.icon className="w-7 h-7" />
              </div>
              <h2 className="ml-4 text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">{section.title}</h2>
            </div>
            <ChevronDown 
              className={`w-6 h-6 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${openSection === section.id ? 'transform rotate-180' : ''}`} 
            />
          </button>
          <div
            className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
              openSection === section.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-6 pt-2 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {section.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

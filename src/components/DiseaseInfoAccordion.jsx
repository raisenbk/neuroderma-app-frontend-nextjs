'use client';

import { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { Activity, Zap, Users, ShieldCheck, AlertTriangle, ChevronDown } from 'lucide-react';

function AccordionItem({ section, isOpen, onToggle }) {
  const { id, title, content, icon: Icon, iconColor, iconBgColor } = section;

  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50/50 dark:hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-colors"
      >
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-full ${iconBgColor}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <h2 className="ml-4 text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
            {title}
          </h2>
        </div>
        <ChevronDown 
          className={`w-6 h-6 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 sm:p-6 ">
            <div className="markdown-content">
            <Markdown>{content || "Informasi tidak tersedia."}</Markdown>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiseaseInfoAccordion({ data }) {
  const [openSection, setOpenSection] = useState('symptoms');

  const handleToggle = (id) => {
    setOpenSection(openSection === id ? null : id); 
  };

  const sections = [
    { id: 'symptoms', title: 'Gejala Umum', content: data.symptoms, icon: Activity, 
      iconColor: 'text-red-600 dark:text-red-400', 
      iconBgColor: 'bg-red-100 dark:bg-red-900/50' },
    { id: 'causes', title: 'Akar Penyebab', content: data.causes, icon: Zap, 
      iconColor: 'text-orange-600 dark:text-orange-400', 
      iconBgColor: 'bg-orange-100 dark:bg-orange-900/50' },
    { id: 'transmission', title: 'Cara Penularan', content: data.transmission, icon: Users, 
      iconColor: 'text-purple-600 dark:text-purple-400', 
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/50' },
    { id: 'prevention', title: 'Langkah Pencegahan', content: data.prevention, icon: ShieldCheck, 
      iconColor: 'text-green-600 dark:text-green-400', 
      iconBgColor: 'bg-green-100 dark:bg-green-900/50' },
    { id: 'when-to-see-doctor', title: 'Kapan Harus ke Dokter?', content: data.whenToSeeDoctor, icon: AlertTriangle, 
      iconColor: 'text-white', 
      iconBgColor: 'bg-red-500 dark:bg-red-600' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden ring-1 ring-slate-200/50 dark:ring-slate-700/50">
      {sections.map(section => (
        (section.content || section.id === 'when-to-see-doctor') && (
            <AccordionItem
              key={section.id}
              section={section}
              isOpen={openSection === section.id}
              onToggle={() => handleToggle(section.id)}
            />
        )
      ))}
    </div>
  );
}
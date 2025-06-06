'use client';

import { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { Activity, Zap, Users, ShieldCheck, AlertTriangle, ChevronDown } from 'lucide-react';

// Komponen untuk satu item akordeon
function AccordionItem({ section, isOpen, onToggle }) {
  const { id, title, content, icon: Icon, iconColor, iconBgColor } = section;

  return (
    <div className="border-b border-slate-200">
      {/* Tombol untuk membuka/menutup akordeon */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-colors"
      >
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-full ${iconBgColor}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <h2 className="ml-4 text-lg sm:text-xl font-bold text-slate-800">
            {title}
          </h2>
        </div>
        <ChevronDown 
          className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>

      {/* Konten yang bisa disembunyikan/ditampilkan */}
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 sm:p-6 prose prose-slate lg:prose-lg max-w-none text-slate-600 leading-relaxed
                          prose-headings:text-slate-700 prose-strong:text-slate-700
                          prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
                          prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-sky-500">
            <Markdown>{content || "Informasi tidak tersedia."}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen utama Akordeon
export default function DiseaseInfoAccordion({ data }) {
  // State untuk melacak section mana yang terbuka. Default 'symptoms' terbuka.
  const [openSection, setOpenSection] = useState('symptoms');

  const handleToggle = (id) => {
    setOpenSection(openSection === id ? null : id); // Tutup jika sudah terbuka, buka jika tertutup
  };

  const sections = [
    { id: 'symptoms', title: 'Gejala Umum', content: data.symptoms, icon: Activity, iconColor: 'text-red-600', iconBgColor: 'bg-red-100' },
    { id: 'causes', title: 'Akar Penyebab', content: data.causes, icon: Zap, iconColor: 'text-orange-600', iconBgColor: 'bg-orange-100' },
    { id: 'transmission', title: 'Cara Penularan', content: data.transmission, icon: Users, iconColor: 'text-purple-600', iconBgColor: 'bg-purple-100' },
    { id: 'prevention', title: 'Langkah Pencegahan', content: data.prevention, icon: ShieldCheck, iconColor: 'text-green-600', iconBgColor: 'bg-green-100' },
    { id: 'when-to-see-doctor', title: 'Kapan Harus ke Dokter?', content: data.whenToSeeDoctor, icon: AlertTriangle, iconColor: 'text-white', iconBgColor: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden ring-1 ring-slate-200/50">
      {sections.map(section => (
        // Jangan render jika tidak ada konten, kecuali untuk 'Kapan ke Dokter' yang selalu penting
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
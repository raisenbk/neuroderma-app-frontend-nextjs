'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lightbulb, ShieldCheck, Mail, AlertTriangle, ChevronDown } from 'lucide-react';

const sections = [
  {
    id: 'misi',
    title: 'Misi Kami',
    icon: Lightbulb,
    iconClassName: 'bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400',
    content: (
        <p>Misi kami adalah memberdayakan individu dengan menyediakan informasi kesehatan kulit yang mudah diakses dan alat deteksi dini yang intuitif. Kami percaya bahwa kesadaran dan deteksi awal adalah kunci untuk penanganan yang lebih efektif.</p>
    ),
  },
  {
    id: 'teknologi',
    title: 'Teknologi',
    icon: ShieldCheck,
    iconClassName: 'bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400',
    content: (
        <p>NeuroDerma memanfaatkan <em>machine learning</em> dan neural networks, dengan antarmuka Next.js yang responsif dan didukung oleh CMS Strapi untuk manajemen konten yang fleksibel.</p>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Penting untuk Diingat',
    icon: AlertTriangle,
    iconClassName: 'bg-red-200 text-red-600 dark:bg-red-900/50 dark:text-red-400',
    content: (
        <>
            <p className="font-semibold text-red-800 dark:text-red-300">NeuroDerma adalah alat bantu informasi, <strong>bukan pengganti diagnosis medis profesional</strong>.</p>
            <p className="mt-2 text-red-700 dark:text-red-400">Akurasi dapat dipengaruhi oleh kualitas gambar. Konsultasi langsung dengan dokter atau dermatologis adalah langkah yang paling tepat untuk setiap kekhawatiran medis.</p>
        </>
    ),
  },
  {
    id: 'kontak',
    title: 'Hubungi Kami',
    icon: Mail,
    iconClassName: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400',
    content: (
        <p>Kami sangat menghargai masukan Anda. Hubungi kami melalui <a href="mailto:rafi@neuroderma.com" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">email</a> atau kunjungi <Link href="/kontak" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">halaman kontak</Link> kami.</p>
    ),
  },
];

export default function TentangKamiAccordion() {
  const [openSection, setOpenSection] = useState('misi');

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
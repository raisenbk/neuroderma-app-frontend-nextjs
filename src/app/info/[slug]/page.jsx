// src/app/info/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import { Thermometer, Virus, ShieldCheck, Users, AlertTriangle, ArrowLeft, Info, Activity, Zap } from 'lucide-react';
import DiseaseInfoAccordion from '@/components/DiseaseInfoAccordion';


const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

async function getDiseaseBySlug(slug) {
  if (!slug) {
    console.error("getDiseaseBySlug called with undefined or null slug");
    return null;
  }
  try {
    const res = await fetch(`${STRAPI_API_URL}/api/diseases?filters[slug][$eq]=${slug}&populate=*`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error(`Failed to fetch disease with slug ${slug}: ${res.status} ${res.statusText}`);
      return null;
    }

    const responseJson = await res.json();
    if (responseJson.data && responseJson.data.length > 0 && responseJson.data[0].attributes) {

      return responseJson.data[0].attributes; 

    } else if (responseJson.data && responseJson.data.length > 0 && !responseJson.data[0].attributes) {

      console.warn(`Disease with slug ${slug} found, but attributes are missing. Returning data[0] for inspection.`);

      return responseJson.data[0];

    }
    return null;
  } catch (error) {
    console.error(`Error fetching disease with slug ${slug}:`, error);
    return null;
  }
}

function InfoSection({ id, title, content, icon: IconComponent, iconColor, iconBgColor }) {
  if (!content) return null;
  return (
    <section id={id} className="mb-8 scroll-mt-24">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden ring-1 ring-slate-200/50">
        {/* Header Section dengan Ikon dan Judul */}
        <div className="flex items-center p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
          <div className={`flex-shrink-0 p-3 rounded-full ${iconBgColor || 'bg-sky-100'}`}>
            <IconComponent className={`w-6 h-6 ${iconColor || 'text-sky-600'}`} />
          </div>
          <h2 className="ml-4 text-xl sm:text-2xl font-bold text-slate-800">
            {title}
          </h2>
        </div>
        {/* Konten Markdown */}
        <div className="p-5 sm:p-6">
          <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 leading-relaxed
                         prose-headings:text-slate-700 prose-strong:text-slate-700
                         prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
                         prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-sky-500">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    </section>
  );
}


// Komponen Peringatan Khusus untuk "Kapan Harus ke Dokter"
function DoctorAlert({ id, title, content, icon: IconComponent }) {
  if (!content) return null;
  return (
    <section id={id} className="mb-8 scroll-mt-24">
      <div className="bg-red-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden ring-1 ring-red-200/50">
         {/* Header Section dengan Ikon dan Judul */}
        <div className="flex items-center p-4 sm:p-5 bg-red-100/70 border-b border-red-200/80">
          <div className="flex-shrink-0 p-3 rounded-full bg-red-200">
             <IconComponent className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="ml-4 text-xl sm:text-2xl font-bold text-red-800">
            {title}
          </h2>
        </div>
        {/* Konten Markdown */}
        <div className="p-5 sm:p-6">
            <div className="prose prose-red max-w-none text-red-800
                            prose-strong:text-red-800 prose-a:text-red-900">
              <Markdown>{content}</Markdown>
            </div>
        </div>
      </div>
    </section>
  );
}

// Komponen untuk Navigasi Cepat di Sisi Kiri
function QuickNav() {
  const navItems = [
    { id: 'symptoms', label: 'Gejala', icon: Activity },
    { id: 'causes', label: 'Penyebab', icon: Zap },
    { id: 'transmission', label: 'Penularan', icon: Users },
    { id: 'prevention', label: 'Pencegahan', icon: ShieldCheck },
    { id: 'when-to-see-doctor', label: 'Kapan ke Dokter?', icon: AlertTriangle },
  ];

  return (
    <div className="sticky top-24">
      <div className="bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow-md ring-1 ring-slate-900/5">
        <h3 className="font-bold text-slate-800 px-3 mb-2 text-lg">Navigasi Cepat</h3>
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                className="group flex items-center px-3 py-2 text-slate-700 hover:bg-sky-50 rounded-lg transition-colors duration-200"
              >
                <div className={`p-1.5 mr-3 rounded-md bg-slate-100 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors duration-200 ${
                    item.id === 'when-to-see-doctor' ? 'group-hover:!bg-red-100 group-hover:!text-red-600' : ''
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function DiseasePage({ params }) {
  const slug = params.slug;
  if (!slug) notFound();

  const diseaseData = await getDiseaseBySlug(slug);

  if (!diseaseData) {
    return (
        <main className="py-20 px-4 text-center">
            <h1 className="text-3xl font-bold text-slate-800">Informasi Tidak Ditemukan</h1>
            <p className="text-slate-600 mt-2">Maaf, kami tidak dapat menemukan informasi untuk "{slug}".</p>
            <Link href="/" className="mt-6 inline-block bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors">
                Kembali ke Beranda
            </Link>
        </main>
    );
  }

  const { name, symptoms, causes, transmission, prevention, whenToSeeDoctor } = diseaseData;

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <header className="py-12 sm:py-16 bg-gradient-to-br from-sky-500 to-teal-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-4 bg-white/20 rounded-2xl mb-4">
             <Info className="w-12 h-12 mx-auto text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {diseaseData.name}
          </h1>
          <p className="mt-4 text-lg text-sky-100 max-w-3xl mx-auto">
            Informasi lengkap mengenai gejala, penyebab, dan cara pencegahan.
          </p>
        </div>
      </header>
      
      {/* Konten Utama - Menggunakan Komponen Akordeon Baru */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full">

            {/* Cukup panggil komponen akordeon di sini */}
            <DiseaseInfoAccordion data={diseaseData} />
        
            {/* Tombol Kembali */}
            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-3 bg-sky-600 text-white font-bold rounded-full shadow-lg hover:bg-sky-700 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Halaman Utama
              </Link>
            </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${STRAPI_API_URL}/api/diseases?fields[0]=slug`);
    if (!res.ok) {
      console.error(`StaticParams: Failed to fetch slugs: ${res.status} ${res.statusText}`);
      return [];
    }
    const responseJson = await res.json();
    if (responseJson.data && Array.isArray(responseJson.data)) {
      return responseJson.data
        .filter(disease => disease && disease.attributes && disease.attributes.slug)
        .map((disease) => ({
          slug: disease.attributes.slug,
        }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching slugs for static generation:', error);
    return [];
  }
}

export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
   if (!params || typeof params.slug === 'undefined') {
    return {
      title: 'Informasi Penyakit Tidak Ditemukan',
      description: 'Halaman informasi penyakit yang Anda cari tidak ditemukan.',
    };
  }
  const slug = params.slug;
  const diseaseData = await getDiseaseBySlug(slug);

  if (!diseaseData || typeof diseaseData.name === 'undefined') {
    return {
      title: 'Informasi Penyakit Tidak Ditemukan',
      description: 'Detail untuk penyakit ini tidak tersedia saat ini.',
    };
  }
  return {
    title: `Info Penyakit: ${diseaseData.name} - NeuroDerma`,
    description: `Pelajari tentang gejala, penyebab, penularan, pencegahan, dan kapan harus ke dokter untuk ${diseaseData.name}.`,
  };
}

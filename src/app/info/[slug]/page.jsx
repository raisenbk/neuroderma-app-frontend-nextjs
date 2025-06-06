// src/app/info/[slug]/page.jsx
import { notFound } from 'next/navigation';
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

export default async function DiseasePage({ params }) {
  const slug = params.slug;
  if (!slug) notFound();

  const diseaseData = await getDiseaseBySlug(slug);

  if (!diseaseData) {
    return (
        <main className="py-20 px-4 text-center">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Informasi Tidak Ditemukan</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Maaf, kami tidak dapat menemukan informasi untuk "{slug}".</p>
            <Link href="/" className="mt-6 inline-block bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 transition-colors">
                Kembali ke Beranda
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
            {diseaseData.name}
          </h1>
          <p className="mt-4 text-lg text-sky-100 dark:text-sky-200 max-w-3xl mx-auto">
            Informasi lengkap mengenai gejala, penyebab, dan cara pencegahan.
          </p>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full">
            <DiseaseInfoAccordion data={diseaseData} />
            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-3 bg-sky-600 dark:bg-sky-500 text-white font-bold rounded-full shadow-lg hover:bg-sky-700 dark:hover:bg-sky-400 transition-all duration-300 transform hover:scale-105"
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

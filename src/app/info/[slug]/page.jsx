// src/app/info/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import { Thermometer, Activity, ShieldAlert, Users, UserCheck, ArrowLeft, Info, Zap, AlertCircle } from 'lucide-react';

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

function InfoSection({ title, content, icon: IconComponent, iconColor = "text-blue-500" }) {
  if (!content) return <p className="text-slate-500 italic">Informasi {title.toLowerCase()} belum tersedia.</p>;
  return (
    <section className="mb-8 p-6 bg-slate-50/80 rounded-lg ring-1 ring-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 className="flex items-center text-2xl sm:text-3xl font-semibold mb-4 text-slate-800">
        {IconComponent && <IconComponent className={`w-7 h-7 mr-3 ${iconColor}`} />}
        {title}
      </h2>
      <div className="prose prose-slate lg:prose-lg max-w-none text-slate-700 leading-relaxed 
                    prose-headings:text-slate-700 prose-headings:font-semibold
                    prose-strong:text-slate-700
                    prose-a:text-blue-600 prose-a:hover:text-blue-500
                    prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-blue-500
                    prose-ol:list-decimal prose-ol:pl-5 prose-li:marker:text-blue-500
                    prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-600 prose-blockquote:not-italic">
        <Markdown>{content}</Markdown>
      </div>
    </section>
  );
}


export default async function DiseasePage({ params: paramsPromise }) {
  const params = await paramsPromise;

  if (!params || typeof params.slug === 'undefined') {
    console.error('Slug is not available in params.');
    notFound();
    return null;
  }

  const slug = params.slug;
  const diseaseData = await getDiseaseBySlug(slug);

  if (!diseaseData) {
    return (
        <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-sky-100 min-h-[calc(100vh-150px)] flex flex-col items-center justify-center">
            <div className="bg-white/90 backdrop-blur-lg p-8 sm:p-12 rounded-xl shadow-2xl max-w-md mx-auto ring-1 ring-slate-200 text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Informasi Tidak Ditemukan</h1>
                <p className="text-slate-600 mb-6">Maaf, informasi untuk penyakit dengan slug "{slug}" tidak dapat ditemukan saat ini.</p>
                <div className="mt-12 text-center">
                    <div className="inline-flex w-full animate-rotate-border duration-500 ease-out transform-3d rounded-lg max-w-sm cursor-pointer hover:scale-[1.03] hover:bg-conic/[from_var(--border-angle)] from-white via-red-600 to-white from-80% via-90% to-100% p-px transition-all">
                      <Link
                        href="/"
                        className="flex items-center w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold shadow-md rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-teal-600"
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

  const { name, symptoms, causes, transmission, prevention, whenToSeeDoctor } = diseaseData;

  if (typeof name === 'undefined') {
    console.error(`Field "name" is missing in diseaseData for slug "${slug}".`);
    notFound(); 
    return null;
  }

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-sky-100 min-h-[calc(100vh-150px)]">
      <div className="bg-white/90 backdrop-blur-lg p-8 sm:p-12 rounded-xl shadow-2xl max-w-4xl mx-auto ring-1 ring-slate-200">
        <header className="mb-10 text-center">
          <Info className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Informasi: {name}
            </span>
          </h1>
        </header>
        
        <div className="space-y-8">
          <InfoSection title="Gejala" content={symptoms} icon={Activity} iconColor="text-red-500" />
          <InfoSection title="Penyebab" content={causes} icon={Zap} iconColor="text-yellow-600" />
          <InfoSection title="Cara Penularan" content={transmission} icon={Users} iconColor="text-purple-500" />
          <InfoSection title="Pencegahan Umum" content={prevention} icon={ShieldAlert} iconColor="text-green-500" />
          <InfoSection title="Kapan Harus ke Dokter?" content={whenToSeeDoctor} icon={UserCheck} iconColor="text-indigo-500" />
        </div>

        <div className="mt-12 text-center">
            <div className="inline-flex w-full animate-rotate-border duration-500 ease-out transform-3d rounded-lg max-w-sm cursor-pointer hover:scale-[1.03] hover:bg-conic/[from_var(--border-angle)] from-white via-red-600 to-white from-80% via-90% to-100% p-px transition-all">
              <Link
                href="/"
                className="flex items-center w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold shadow-md rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-teal-600"
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

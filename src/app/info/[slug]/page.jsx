// src/app/info/[slug]/page.jsx
import { notFound } from 'next/navigation';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import { Thermometer, Virus, ShieldCheck, Users, AlertTriangle, ArrowLeft, Info, Activity, Zap } from 'lucide-react';


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

function InfoSection({ id, title, content, icon: IconComponent, iconColor = "text-sky-500" }) {
  if (!content) return null;
  return (
    <section id={id} className="mb-8 scroll-mt-24">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ring-1 ring-slate-200/50">
        <div className="p-6">
          <h2 className="flex items-center text-2xl font-bold text-slate-800 mb-4">
            {IconComponent && <IconComponent className={`w-7 h-7 mr-3 ${iconColor}`} />}
            {title}
          </h2>
          <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 leading-relaxed
                          prose-headings:text-slate-700 prose-strong:text-slate-700
                          prose-a:text-sky-600 prose-a:hover:text-sky-500 transition-colors
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
        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 shadow-md">
            <h2 className="flex items-center text-2xl font-bold text-red-800 mb-4">
                {IconComponent && <IconComponent className="w-7 h-7 mr-3 text-red-600" />}
                {title}
            </h2>
            <div className="prose prose-slate max-w-none text-red-700
                            prose-strong:text-red-700
                            prose-a:text-red-900 prose-a:hover:underline">
                <Markdown>{content}</Markdown>
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
      <div className="bg-white/70 backdrop-blur-lg p-4 rounded-xl shadow-md ring-1 ring-slate-200/50">
        <h3 className="font-bold text-slate-700 px-3 mb-2">Navigasi Cepat</h3>
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                className="flex items-center px-3 py-2 text-slate-600 hover:bg-sky-100 hover:text-sky-700 rounded-md transition-all duration-200 font-medium"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
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
    // Tampilan "Tidak Ditemukan" (bisa dibuat lebih baik juga jika perlu)
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
      <header className="py-10 sm:py-16 bg-gradient-to-br from-sky-500 to-teal-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Info className="w-16 h-16 mx-auto mb-4 text-white/80" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-shadow-md">
            {name}
          </h1>
          <p className="mt-3 text-lg text-sky-100 max-w-2xl mx-auto">
            Informasi lengkap mengenai gejala, penyebab, dan cara pencegahan.
          </p>
        </div>
      </header>
      
      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          
          {/* Kolom Navigasi (Hanya di Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <QuickNav />
          </aside>

          {/* Kolom Konten Utama */}
          <div className="lg:col-span-9">
            <InfoSection id="symptoms" title="Gejala Umum" content={symptoms} icon={Activity} iconColor="text-red-500" />
            <InfoSection id="causes" title="Akar Penyebab" content={causes} icon={Zap} iconColor="text-orange-500" />
            <InfoSection id="transmission" title="Cara Penularan" content={transmission} icon={Users} iconColor="text-purple-500" />
            <InfoSection id="prevention" title="Langkah Pencegahan" content={prevention} icon={ShieldCheck} iconColor="text-green-500" />
            <DoctorAlert id="when-to-see-doctor" title="Kapan Harus ke Dokter?" content={whenToSeeDoctor} icon={AlertTriangle} />
          
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

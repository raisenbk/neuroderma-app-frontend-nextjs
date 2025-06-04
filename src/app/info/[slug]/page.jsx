// src/app/info/[slug]/page.jsx

import { notFound } from 'next/navigation';

import Markdown from 'markdown-to-jsx';


const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';


async function getDiseaseBySlug(slug) {
  if (!slug) {
    console.error("getDiseaseBySlug called with undefined or null slug");

    return null;

  }

  try {

    const res = await fetch(`${STRAPI_API_URL}/api/diseases?filters[slug][$eq]=${slug}`, {

      next: { revalidate: 60 }

    });


    if (!res.ok) {

      console.error(`Failed to fetch disease with slug ${slug}: ${res.status} ${res.statusText}`);

      return null;

    }


    const responseJson = await res.json();

    // Asumsi berdasarkan log Anda bahwa getDiseaseBySlug HARUS mengembalikan attributes

    if (responseJson.data && responseJson.data.length > 0 && responseJson.data[0].attributes) {

      return responseJson.data[0].attributes; // Mengembalikan objek attributes secara langsung

    } else if (responseJson.data && responseJson.data.length > 0 && !responseJson.data[0].attributes) {

      // Jika attributes tidak ada, tapi data[0] ada, log dan return data[0] agar bisa diinspeksi

      console.warn(`Disease with slug ${slug} found, but attributes are missing. Returning data[0] for inspection.`);

      return responseJson.data[0];

    }

    return null;

  } catch (error) {

    console.error(`Error fetching disease with slug ${slug}:`, error);

    return null;

  }

}


// Komponen Halaman Dinamis

export default async function DiseasePage({ params }) { // Ubah { params } menjadi props
    const slug = (await params)?.slug; // ✅ Await just in case Next returns a Promise

  if (!slug) {
    console.error('Slug is not available in params.');
    notFound();
    return null;
  }

  const diseaseData = await getDiseaseBySlug(slug);

  if (!diseaseData) {
    notFound();
    return null;
  }

  // return (
  //   <div>
  //     <h1>{diseaseData.name}</h1>
  //     <p>{diseaseData.description}</p>
  //     {/* render other data */}
  //   </div>
  // );




  // Log ini penting untuk melihat apa isi diseaseData SETELAH getDiseaseBySlug

//   console.log(`Fetched diseaseData for slug "${slug}":`, JSON.stringify(diseaseData, null, 2));


  if (!diseaseData) {

    // console.log(`Disease with slug "${slug}" not found, calling notFound().`);

    notFound();

    return null;

  }


  // Karena getDiseaseBySlug sekarang MENGEMBALIKAN attributes,

  // kita tidak perlu lagi .attributes di sini

  const { name, symptoms, causes, transmission, prevention, whenToSeeDoctor } = diseaseData;


  // Pastikan semua field yang di-destructure ada di diseaseData

  if (typeof name === 'undefined' || typeof symptoms === 'undefined' /* ...cek field lain */) {

    console.error(`One or more expected fields are missing in diseaseData for slug "${slug}". Data:`, JSON.stringify(diseaseData, null, 2));

    // Anda bisa memilih untuk notFound() atau menampilkan pesan error

    notFound();

    return null;

  }


  return (

    <main className="container mx-auto px-4 py-8 max-w-4xl">

      <article className="prose lg:prose-xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">

          Informasi: {name}

        </h1>

       

        <section className="mb-6">

          <h2 className="text-2xl font-semibold text-gray-700 mb-2">📝 Gejala</h2>

          <Markdown>{symptoms || 'Informasi gejala belum tersedia.'}</Markdown>

        </section>


        <section className="mb-6">

          <h2 className="text-2xl font-semibold text-gray-700 mb-2">❓ Penyebab</h2>

          <Markdown>{causes || 'Informasi penyebab belum tersedia.'}</Markdown>

        </section>


        <section className="mb-6">

          <h2 className="text-2xl font-semibold text-gray-700 mb-2">🔄 Cara Penularan</h2>

          <Markdown>{transmission || 'Informasi cara penularan belum tersedia.'}</Markdown>

        </section>


        <section className="mb-6">

          <h2 className="text-2xl font-semibold text-gray-700 mb-2">🛡️ Pencegahan Umum</h2>

          <Markdown>{prevention || 'Informasi pencegahan belum tersedia.'}</Markdown>

        </section>


        <section>

          <h2 className="text-2xl font-semibold text-gray-700 mb-2">👨‍⚕️ Kapan Harus ke Dokter?</h2>

          <Markdown>{whenToSeeDoctor || 'Informasi kapan harus ke dokter belum tersedia.'}</Markdown>

        </section>

      </article>

    </main>

  );

}


// (Opsional) Untuk Static Site Generation (SSG)

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


// (Opsional) Untuk SEO: Menambahkan metadata dinamis

export async function generateMetadata({ params }) { // Ubah { params } menjadi props

  const slug = (await params)?.slug;

  if (!slug) {
    return {
      title: 'Penyakit Tidak Ditemukan',
    };
  }

  const diseaseData = await getDiseaseBySlug(slug);

  // return {
  //   title: diseaseData?.name ?? 'Penyakit Tidak Diketahui',
  //   description: diseaseData?.description ?? '',
  // };


  if (!diseaseData) {

    return {

      title: 'Informasi Penyakit Tidak Ditemukan',

      description: 'Halaman informasi penyakit yang Anda cari tidak ditemukan.',

    };

  }

  // Akses langsung diseaseData.name karena getDiseaseBySlug mengembalikan attributes

  if (typeof diseaseData.name === 'undefined') {

     console.error(`Field "name" is missing in diseaseData for metadata (slug "${slug}"). Data:`, JSON.stringify(diseaseData, null, 2));

     return {

        title: 'Kesalahan Data Penyakit',

        description: 'Informasi penyakit tidak lengkap.'

     }

  }


  return {

    title: `Informasi Penyakit: ${diseaseData.name}`,

    description: `Pelajari lebih lanjut tentang gejala, penyebab, dan pencegahan ${diseaseData.name}.`,

  };

}


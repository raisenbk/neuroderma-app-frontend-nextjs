// src/app/tentang-kami/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Tentang Kami - Sistem Deteksi Penyakit Kulit',
  description: 'Pelajari lebih lanjut tentang proyek Sistem Deteksi Penyakit Kulit.',
};

export default function TentangKamiPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg prose lg:prose-xl mx-auto">
        <h1>Tentang Kami</h1>
        
        <p>
          Selamat datang di <strong>NeuroDerma: Smart Pox Identification via Neural Networks</strong>. Proyek ini bertujuan untuk memberikan alat bantu awal dalam mengidentifikasi beberapa kondisi kulit umum berdasarkan analisis gambar.
        </p>
        
        <h2>Misi Kami</h2>
        <p>
          Misi kami adalah menyediakan informasi yang mudah diakses dan alat deteksi dini yang dapat membantu pengguna untuk lebih sadar akan kesehatan kulit mereka. Kami percaya bahwa deteksi awal dapat mengarah pada penanganan yang lebih baik dan hasil kesehatan yang lebih positif.
        </p>

        <h2>Teknologi yang Digunakan</h2>
        <p>
          Aplikasi ini dibangun menggunakan teknologi machine learning untuk menganalisis gambar kulit. Model kami dilatih untuk mengenali pola yang terkait dengan beberapa penyakit kulit tertentu. Frontend aplikasi dikembangkan menggunakan Next.js untuk pengalaman pengguna yang cepat dan responsif, sementara manajemen konten didukung oleh CMS seperti Strapi.
        </p>
        
        <h2>Penting untuk Diingat</h2>
        <p>
          Kami ingin menekankan kembali bahwa aplikasi ini <strong>bukanlah pengganti diagnosis medis profesional</strong>. Hasil yang diberikan bersifat informatif dan hanya sebagai alat bantu awal. Jika Anda memiliki kekhawatiran tentang kondisi kulit Anda, sangat penting untuk segera berkonsultasi dengan dokter atau dermatologis yang berkualifikasi.
        </p>
        <p>
          Akurasi model deteksi dapat bervariasi tergantung pada kualitas gambar yang diunggah dan faktor-faktor lainnya. Kami terus berupaya untuk meningkatkan model kami, namun diagnosis akhir harus selalu datang dari profesional medis.
        </p>

        <h2>Hubungi Kami</h2>
        <p>
          Jika Anda memiliki pertanyaan atau masukan mengenai aplikasi ini, jangan ragu untuk menghubungi kami melalui [Email] atau melalui <Link href="/kontak">halaman kontak</Link>.
        </p>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            &larr; Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </main>
  );
}
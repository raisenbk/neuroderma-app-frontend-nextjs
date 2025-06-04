// src/app/tentang-kami/page.jsx
import Link from 'next/link';
import { Lightbulb, ShieldCheck, Users, AlertTriangle, Mail, ArrowLeft } from 'lucide-react'; // Contoh ikon

export const metadata = {
  title: 'Tentang Kami - NeuroDerma',
  description: 'Pelajari lebih lanjut tentang proyek NeuroDerma: Smart Pox Identification via Neural Networks.',
};

export default function TentangKamiPage() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-sky-100 min-h-[calc(100vh-150px)]"> {/* Sesuaikan min-h jika perlu */}
      <div className="bg-white/90 backdrop-blur-lg p-8 sm:p-12 rounded-xl shadow-2xl max-w-4xl mx-auto ring-1 ring-slate-200">
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Tentang NeuroDerma
          </span>
        </h1>
        
        <section className="mb-10">
          <p className="text-slate-700 leading-relaxed text-lg sm:text-xl text-center">
            Selamat datang di <strong>NeuroDerma: Smart Pox Identification via Neural Networks</strong>.
            Proyek inovatif ini dirancang sebagai alat bantu cerdas untuk identifikasi awal beberapa kondisi kulit umum melalui analisis gambar berbasis kecerdasan buatan.
          </p>
        </section>
        
        <div className="space-y-10">
          <div className="p-6 bg-slate-50/70 rounded-lg ring-1 ring-slate-200/50">
            <h2 className="flex items-center text-2xl sm:text-3xl font-semibold mb-4 text-slate-800">
              <Lightbulb className="w-8 h-8 mr-3 text-blue-500" />
              Misi Kami
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Misi kami adalah memberdayakan individu dengan menyediakan informasi kesehatan kulit yang mudah diakses dan alat deteksi dini yang intuitif. Kami percaya bahwa kesadaran dan deteksi awal adalah kunci untuk penanganan yang lebih efektif dan hasil kesehatan yang lebih optimal.
            </p>
          </div>

          <div className="p-6 bg-slate-50/70 rounded-lg ring-1 ring-slate-200/50">
            <h2 className="flex items-center text-2xl sm:text-3xl font-semibold mb-4 text-slate-800">
              <ShieldCheck className="w-8 h-8 mr-3 text-teal-500" />
              Teknologi yang Digunakan
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              NeuroDerma memanfaatkan kekuatan <em>machine learning</em> dan jaringan saraf tiruan (neural networks) untuk menganalisis gambar kulit. Model kami dilatih secara ekstensif untuk mengenali pola visual yang terkait dengan beberapa penyakit kulit. Antarmuka pengguna dikembangkan dengan Next.js untuk performa tinggi dan pengalaman yang responsif, sementara manajemen konten informatif didukung oleh CMS Strapi.
            </p>
          </div>
          
          <div className="p-6 bg-red-50/70 rounded-lg ring-1 ring-red-200/50">
            <h2 className="flex items-center text-2xl sm:text-3xl font-semibold mb-4 text-red-700">
              <AlertTriangle className="w-8 h-8 mr-3 text-red-500" />
              Penting untuk Diingat
            </h2>
            <p className="text-red-600 leading-relaxed text-lg">
              Kami ingin menekankan kembali bahwa NeuroDerma adalah alat bantu informasi dan <strong>bukan pengganti diagnosis medis profesional</strong>. Hasil analisis bersifat prediktif dan informatif. Jika Anda memiliki kekhawatiran mengenai kondisi kulit Anda, konsultasi langsung dengan dokter atau dermatologis adalah langkah yang paling tepat dan tidak tergantikan.
            </p>
            <p className="text-red-600 leading-relaxed text-lg mt-3">
              Akurasi model dapat dipengaruhi oleh berbagai faktor, termasuk kualitas gambar. Kami terus berinovasi untuk meningkatkan kemampuan model, namun diagnosis definitif hanya dapat diberikan oleh tenaga medis profesional.
            </p>
          </div>

          <div className="p-6 bg-slate-50/70 rounded-lg ring-1 ring-slate-200/50">
            <h2 className="flex items-center text-2xl sm:text-3xl font-semibold mb-4 text-slate-800">
              <Mail className="w-8 h-8 mr-3 text-indigo-500" />
              Hubungi Kami
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Kami sangat menghargai masukan Anda. Jika Anda memiliki pertanyaan, saran, atau ingin berkolaborasi, silakan hubungi kami melalui [rafi@neuroderma.com] atau melalui <Link href="/kontak" className="text-blue-600 hover:text-blue-500 font-medium underline">halaman kontak</Link>.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </main>
  );
}
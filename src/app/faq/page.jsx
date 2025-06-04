import Link from 'next/link';

export const metadata = {
  title: 'FAQ - Sistem Deteksi Penyakit Kulit',
  description: 'Temukan jawaban atas pertanyaan umum mengenai Sistem Deteksi Penyakit Kulit.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Apakah aplikasi ini dapat menggantikan kunjungan ke dokter?",
      answer: "Tidak. Aplikasi ini dirancang sebagai alat bantu informasi awal dan tidak boleh dianggap sebagai pengganti diagnosis medis profesional. Jika Anda memiliki kekhawatiran tentang kesehatan kulit Anda, selalu konsultasikan dengan dokter atau dermatologis."
    },
    {
      question: "Seberapa akurat hasil deteksi dari aplikasi ini?",
      answer: "Akurasi model machine learning kami dapat bervariasi tergantung pada banyak faktor, termasuk kualitas gambar yang diunggah, pencahayaan, dan variasi individu pada gejala penyakit. Hasilnya bersifat prediktif dan harus selalu dikonfirmasi oleh profesional medis."
    },
    {
      question: "Penyakit kulit apa saja yang dapat dideteksi oleh aplikasi ini?",
      answer: "Saat ini, model kami dilatih untuk mencoba mengenali beberapa kondisi seperti Cacar Monyet (Monkeypox), Cacar Air (Chickenpox), dan Campak (Measles), serta membedakannya dari kulit normal. Daftar ini mungkin berkembang di masa depan."
    },
    {
      question: "Bagaimana cara mendapatkan hasil deteksi terbaik?",
      answer: "Pastikan gambar yang Anda unggah memiliki kualitas yang baik, fokus, dan dengan pencahayaan yang cukup. Area kulit yang bermasalah harus terlihat jelas. Hindari penggunaan filter atau pengeditan pada gambar."
    },
    {
      question: "Apakah data gambar saya aman?",
      answer: "Kami berkomitmen untuk menjaga privasi pengguna. Semua gambar yang diunggah untuk keperluan prediksi tidak disimpan di sistem kami setelah proses prediksi selesai. Gambar hanya digunakan sementara untuk menjalankan analisis, dan akan dihapus secara otomatis tanpa disimpan di server atau basis data manapun. Dengan demikian, data Anda tetap aman dan terlindungi."
    },
    {
      question: "Apa yang harus saya lakukan jika hasil deteksi menunjukkan kemungkinan suatu penyakit?",
      answer: "Jika hasil deteksi menunjukkan kemungkinan adanya suatu kondisi kulit, jangan panik. Langkah terbaik adalah segera membuat janji temu dengan dokter atau dermatologis untuk pemeriksaan lebih lanjut dan diagnosis yang akurat."
    }
  ];

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg prose lg:prose-xl mx-auto">
        <h1>Pertanyaan yang Sering Diajukan (FAQ)</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-gray-700">{faq.question}</h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Tidak menemukan jawaban yang Anda cari? 
            <Link href="/kontak" className="text-blue-600 hover:text-blue-700"> Hubungi kami</Link>.
          </p>
          <Link href="/" className="block mt-4 text-blue-600 hover:text-blue-700 font-semibold">
            &larr; Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </main>
  );
}
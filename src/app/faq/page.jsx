// src/app/faq/page.jsx
'use client'; // Komponen ini sekarang interaktif, jadi perlu 'use client'

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowLeft } from 'lucide-react'; // Ikon

// Komponen untuk satu item FAQ (Accordion)
function FaqItem({ faq, index, isOpen, onToggle }) {
  return (
    // Setiap item FAQ sekarang memiliki latar belakang dan ring sendiri
    <div className="bg-slate-50/70 rounded-lg ring-1 ring-slate-200/50 overflow-hidden">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 px-4 sm:px-6 text-left font-semibold text-slate-700 hover:text-blue-600 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 transition-colors duration-200"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span className="text-lg sm:text-xl">{faq.question}</span>
          <ChevronDown
            className={`w-6 h-6 text-slate-400 transform transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-blue-500' : 'text-slate-500' // Ubah warna chevron saat terbuka
            }`}
          />
        </button>
      </h2>
      <div
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${ // Durasi diubah agar lebih cepat
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0' // max-h disesuaikan
        }`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
      >
        {/* Padding ditambahkan di sini untuk jawaban */}
        <div className="px-4 sm:px-6 pt-0 pb-5 text-slate-600 leading-relaxed text-base">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

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

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-sky-100 min-h-[calc(100vh-150px)]"> {/* Latar belakang terang */}
      <div className="bg-white/90 backdrop-blur-lg p-8 sm:p-12 rounded-xl shadow-2xl max-w-3xl mx-auto ring-1 ring-slate-200 "> {/* Kartu utama terang */}
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 mx-auto mb-4 text-blue-500" /> {/* Ikon warna disesuaikan */}
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500"> {/* Teks gradien disesuaikan */}
              Pertanyaan Umum
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-600"> {/* Warna teks disesuaikan */}
            Temukan jawaban untuk pertanyaan yang sering diajukan mengenai NeuroDerma.
          </p>
        </div>

        {/* Kontainer untuk item FAQ */}
        <div className="space-y-4"> {/* Memberi jarak antar item FAQ */}
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-6 text-lg"> {/* Warna teks disesuaikan */}
            Tidak menemukan jawaban yang Anda cari?
            <Link href="/kontak" className="ml-1 text-blue-600 hover:text-blue-500 font-medium underline transition-colors">
              Hubungi kami
            </Link>.
          </p>
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
      </div>
    </main>
  );
}
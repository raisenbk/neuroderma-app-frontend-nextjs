// src/app/faq/page.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react'; 

function FaqItem({ faq, index, isOpen, onToggle }) {
  return (
    <div className="bg-slate-50/70 dark:bg-slate-800/50 rounded-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50 overflow-hidden">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 px-4 sm:px-6 text-left font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 transition-colors duration-200"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span className="text-lg sm:text-xl">{faq.question}</span>
          <ChevronDown
            className={`w-6 h-6 transform transition-transform duration-300 ${
              isOpen 
                ? 'rotate-180 text-blue-500 dark:text-blue-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          />
        </button>
      </h2>
      <div
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${ 
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0' 
        }`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
      >
        <div className="px-4 sm:px-6 pt-0 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
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
    <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950 min-h-[calc(100vh-150px)]">
      <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-lg p-8 sm:p-12 rounded-xl shadow-2xl max-w-3xl mx-auto ring-1 ring-slate-200 dark:ring-slate-700">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 mx-auto mb-4 text-blue-500 dark:text-blue-400" /> 
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400">
              Pertanyaan Umum
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300"> 
            Temukan jawaban untuk pertanyaan yang sering diajukan mengenai NeuroDerma.
          </p>
        </div>

        <div className="space-y-4"> 
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
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
            Tidak menemukan jawaban yang Anda cari?
            <Link href="/kontak" className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium underline transition-colors">
              Hubungi kami
            </Link>.
          </p>
          <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center w-full max-w-sm px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold shadow-md rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-teal-600 hover:scale-105"
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
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import TentangKamiAccordion from '@/components/TentangKamiAccordion';
import Image from 'next/image';

export const metadata = {
  title: 'Tentang Kami - NeuroDerma',
  description: 'Pelajari lebih lanjut tentang proyek NeuroDerma: Smart Pox Identification via Neural Networks.',
};

export default function TentangKamiPage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-900">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
          <div 
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80caff] to-[#4f46e5] opacity-20 dark:opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>

        <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 relative mb-1 sm:mb-0 mx-auto">
                                <Image
                              src="/neurodermadarkmode.png"
                              alt="Logo NeuroDerma"
                              fill
                              sizes="(max-width: 639px) 40px, 48px" 
                              className="object-contain dark:block" 
                              priority 
                            />
                            <Image
                              src="/neuroderma.png" 
                              alt="Logo NeuroDerma"
                              fill
                              sizes="(max-width: 639px) 40px, 48px" 
                              className="object-contain dark:hidden" 
                              priority 
                            />
            
                          </div>
                          <span
                            className="text-xl sm:text-2xl font-bold 
                                      text-transparent bg-clip-text bg-gradient-to-r 
                                      from-blue-700 to-indigo-800
                                      dark:from-sky-400 dark:to-cyan-300"
                          >
                            NeuroDerma
                          </span>
              <h1 className="mt-7 text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-500">
                  Tentang NeuroDerma
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-8 text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
                Selamat datang di <strong>NeuroDerma: Smart Pox Identification via Neural Networks</strong>. Proyek inovatif ini dirancang sebagai alat bantu cerdas untuk identifikasi awal beberapa kondisi kulit umum melalui analisis gambar berbasis kecerdasan buatan.
              </p>
            </div>
            <TentangKamiAccordion />

            <div className="mt-16 text-center">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-500 dark:to-indigo-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl dark:hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300"
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
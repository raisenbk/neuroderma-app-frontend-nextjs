// src/app/layout.jsx
// Pastikan Anda mengimpor font Inter atau font lain yang Anda gunakan
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link'; // Untuk navigasi
import './globals.css'; // Asumsi file CSS global Anda ada di sini

const inter = Inter({ subsets: ['latin'] });

// Komponen Footer sederhana
function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto py-8">
      <div className="container mx-auto px-4 text-center text-xs text-gray-500">
        <p className="mb-2">
          <strong>Disclaimer:</strong> Aplikasi ini adalah alat bantu dan tidak menggantikan diagnosis medis profesional. Selalu konsultasikan dengan dokter atau tenaga kesehatan yang berkualifikasi untuk diagnosis dan penanganan yang akurat. Saat ini, aplikasi ini hanya mampu mendeteksi tiga jenis penyakit kulit, yaitu Monkeypox, Chickenpox, dan Measles. Penting untuk diketahui bahwa penyakit kulit lain yang tidak termasuk dalam ketiga kategori tersebut mungkin akan terdeteksi secara keliru sebagai salah satu dari ketiganya, karena keterbatasan model dalam mengenali jenis penyakit di luar cakupan yang dilatih.
        </p>
        <p>
          © {new Date().getFullYear()} Sistem Deteksi Penyakit Kulit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export const metadata = {
  title: 'Sistem Deteksi Penyakit Kulit',
  description: 'Unggah gambar kulit Anda untuk mendapatkan analisis awal.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center text-2xl font-bold text-blue-600 hover:text-blue-700">
                <Image src="/neuroderma.png" alt="Logo" width={100} height={100} />
                <span>NeuroDerma</span>
            </Link>
            <div className="space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Beranda
              </Link>
              <Link href="/tentang-kami" className="text-gray-600 hover:text-blue-600">
                Tentang Kami
              </Link>
              <Link href="/faq" className="text-gray-600 hover:text-blue-600">
                FAQ
              </Link>
            </div>
          </nav>
        </header>
        
        <div className="flex-grow">
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
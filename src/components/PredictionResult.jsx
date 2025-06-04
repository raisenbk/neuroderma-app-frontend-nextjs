// src/components/PredictionResult.jsx 
// (Nama file disesuaikan dengan import di page.jsx, sebelumnya PredictionResultDisplay)
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Impor Link dari next/link

// Data informasi penyakit (tetap sama)
const diseaseDetails = {
  Chickenpox: {
    name: "Chickenpox (Cacar Air)",
    slug: "chickenpox", // Tambahkan slug untuk routing
    defaultDescription: "Infeksi virus yang sangat menular yang menyebabkan ruam gatal dengan lepuh kecil berisi cairan.",
    defaultSuggestions: [
      "Konsultasikan dengan dokter untuk diagnosis dan penanganan yang tepat.",
      "Istirahat yang cukup dan minum banyak cairan.",
      "Hindari menggaruk lepuh untuk mencegah bekas luka dan infeksi.",
      "Gunakan losion kalamin atau mandi oatmeal untuk meredakan gatal.",
    ],
    style: "border-red-500 bg-red-50 text-red-700"
  },
  Measles: {
    name: "Measles (Campak)",
    slug: "measles", // Tambahkan slug
    defaultDescription: "Infeksi virus masa kanak-kanak yang sangat menular yang dapat dicegah dengan vaksin.",
    defaultSuggestions: [
      "Segera hubungi dokter jika Anda atau anak Anda diduga menderita campak.",
      "Pastikan penderita mendapatkan istirahat yang cukup dan asupan cairan yang memadai.",
      "Isolasi diri untuk mencegah penyebaran virus.",
    ],
    style: "border-purple-500 bg-purple-50 text-purple-700"
  },
  Monkeypox: {
    name: "Monkeypox (Cacar Monyet)",
    slug: "monkeypox", // Tambahkan slug
    defaultDescription: "Penyakit virus langka yang menyebabkan ruam dan gejala mirip flu.",
    defaultSuggestions: [
      "Segera konsultasikan dengan dokter atau fasilitas kesehatan terdekat.",
      "Isolasi diri untuk mencegah penularan.",
      "Hindari menggaruk ruam untuk mencegah infeksi sekunder.",
      "Jaga kebersihan diri dan lingkungan.",
    ],
    style: "border-orange-500 bg-orange-50 text-orange-700"
  },
  Normal: { // Sesuaikan dengan output API Anda, misal 'Normal' atau 'Normal_Skin'
    name: "Kulit Normal",
    slug: null, // Tidak ada halaman info khusus untuk kulit normal
    defaultDescription: "Tidak terdeteksi adanya kelainan kulit signifikan berdasarkan gambar yang diunggah.",
    defaultSuggestions: [
      "Lanjutkan menjaga kebersihan dan kesehatan kulit Anda.",
      "Gunakan tabir surya untuk melindungi kulit dari paparan sinar UV.",
      "Jika ada keluhan, konsultasikan dengan dokter kulit.",
    ],
    style: "border-green-500 bg-green-50 text-green-700"
  },
  unknown: {
    name: "Tidak Diketahui",
    slug: null,
    defaultDescription: "Hasil deteksi tidak dapat dikategorikan secara spesifik.",
    defaultSuggestions: ["Harap konsultasikan dengan profesional medis untuk evaluasi lebih lanjut."],
    style: "border-gray-500 bg-gray-100 text-gray-700"
  }
};

export default function PredictionResultDisplay({ result, uploadedImageFile }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (uploadedImageFile) {
      const url = URL.createObjectURL(uploadedImageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [uploadedImageFile]);

  // Menggunakan result.disease langsung sebagai kunci, karena API sudah mengembalikan nama kelas yang benar
  // Pastikan nama kelas dari API (result.disease) cocok dengan kunci di diseaseDetails
  const details = diseaseDetails[result.disease] || diseaseDetails.unknown;

  const displayName = details.name;
  const description = result.description || details.defaultDescription;
  const suggestions = result.suggestions && result.suggestions.length > 0 ? result.suggestions : details.defaultSuggestions;
  const diseaseSlug = details.slug; // Ambil slug dari details

  return (
    <div className={`mt-8 p-6 rounded-lg shadow-lg border-t-4 ${details.style} w-full max-w-md`}>
      <h3 className="text-2xl font-bold mb-4 text-center">{displayName}</h3>

      {imageUrl && (
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Gambar yang Dianalisis:</p>
          <Image
            src={imageUrl}
            alt="Gambar kulit yang diunggah"
            width={250}
            height={250}
            className="rounded-md shadow-md object-contain inline-block"
          />
        </div>
      )}

      <div className="space-y-3">
        <p>
          <strong>Deskripsi:</strong> {description}
        </p>
        <p>
          <strong>Tingkat Kepercayaan Model:</strong> {(result.confidence * 100).toFixed(2)}%
        </p>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-2">Saran Selanjutnya:</h4>
      {suggestions && suggestions.length > 0 ? (
        <ul className="list-disc list-inside space-y-1 pl-4">
          {suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada saran spesifik. Silakan konsultasi dengan dokter.</p>
      )}

      {/* Tombol Informasi Lebih Lanjut */}
      {diseaseSlug && result.disease !== "Normal" && ( // Tampilkan jika ada slug dan bukan kulit normal
        <div className="mt-6 text-center">
          <Link 
            href={`/info/${diseaseSlug}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Pelajari Lebih Lanjut tentang {displayName}
          </Link>
        </div>
      )}

      <p className="mt-8 text-sm text-red-600 font-semibold bg-red-50 p-3 rounded-md border border-red-200 text-center">
        <strong>PENTING:</strong> Hasil deteksi ini bersifat sebagai informasi awal dan BUKAN merupakan diagnosis medis.
        Akurasi model mungkin bervariasi. Selalu konsultasikan dengan dokter atau tenaga kesehatan profesional
        untuk diagnosis yang akurat dan penanganan medis yang tepat.
      </p>
    </div>
  );
}
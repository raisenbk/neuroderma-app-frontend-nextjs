// src/lib/diseaseInfo.js
import { Bug, ShieldCheck, HelpCircle } from 'lucide-react';

export const diseaseDetails = {
  Chickenpox: {
    name: "Chickenpox (Cacar Air)",
    slug: "chickenpox",
    Icon: Bug,
    defaultDescription: "Infeksi virus sangat menular yang menyebabkan ruam gatal dengan lepuh kecil berisi cairan.",
    defaultSuggestions: [
      "Konsultasikan dengan dokter untuk diagnosis dan penanganan yang tepat.",
      "Istirahat yang cukup dan minum banyak cairan.",
      "Hindari menggaruk lepuh untuk mencegah bekas luka dan infeksi.",
      "Gunakan losion kalamin atau mandi oatmeal untuk meredakan gatal.",
    ],
    bgColor: "bg-red-50",
    textColor: "text-red-800",
    borderColor: "border-red-500",
    gaugeColor: "#ef4444"
  },
  Measles: {
    name: "Measles (Campak)",
    slug: "measles",
    Icon: Bug,
    defaultDescription: "Infeksi virus masa kanak-kanak yang sangat menular dan dapat dicegah dengan vaksin.",
    defaultSuggestions: [
      "Segera hubungi dokter jika Anda atau anak Anda diduga menderita campak.",
      "Pastikan penderita mendapatkan istirahat yang cukup dan asupan cairan yang memadai.",
      "Isolasi diri untuk mencegah penyebaran virus.",
    ],
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    borderColor: "border-purple-500",
    gaugeColor: "#a855f7"
  },
  Monkeypox: {
    name: "Monkeypox (Cacar Monyet)",
    slug: "monkeypox",
    Icon: Bug,
    defaultDescription: "Penyakit virus langka yang menyebabkan ruam dan gejala mirip flu.",
    defaultSuggestions: [
        "Segera konsultasikan dengan dokter atau fasilitas kesehatan terdekat.",
        "Isolasi diri untuk mencegah penularan.",
        "Hindari menggaruk ruam untuk mencegah infeksi sekunder.",
        "Jaga kebersihan diri dan lingkungan.",
    ],
    bgColor: "bg-orange-50",
    textColor: "text-orange-800",
    borderColor: "border-orange-500",
    gaugeColor: "#f97316" // orange-500
  },
  Normal: { 
    name: "Kulit Normal",
    slug: null,
    Icon: ShieldCheck,
    defaultDescription: "Tidak terdeteksi adanya kelainan kulit signifikan berdasarkan gambar yang diunggah.",
    defaultSuggestions: [
      "Lanjutkan menjaga kebersihan dan kesehatan kulit Anda.",
      "Gunakan tabir surya untuk melindungi kulit dari paparan sinar UV.",
      "Jika ada keluhan, konsultasikan dengan dokter kulit.",
    ],
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-500",
    gaugeColor: "#22c55e" // green-500
  },
  unknown: {
    name: "Tidak Diketahui",
    slug: null,
    Icon: HelpCircle,
    defaultDescription: "Hasil deteksi tidak dapat dikategorikan secara spesifik.",
    defaultSuggestions: ["Harap konsultasikan dengan profesional medis untuk evaluasi lebih lanjut."],
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    borderColor: "border-gray-500",
    gaugeColor: "#6b7280" // gray-500
  }
};
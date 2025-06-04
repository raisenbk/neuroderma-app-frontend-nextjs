// src/components/PredictionResult.js
import Image from 'next/image'; // Untuk optimasi gambar

export default function PredictionResult({ result, uploadedImage }) {
  if (!result) return null;

  const { disease, confidence, suggestions } = result; // Sesuaikan dengan struktur respons API Anda

  // Contoh data saran (sebaiknya ini datang dari API atau database)
  const diseaseInfo = {
    monkeypox: {
      name: "Monkeypox (Cacar Monyet)",
      description: "Penyakit virus langka yang menyebabkan ruam dan gejala mirip flu.",
      saran: [
        "Segera konsultasikan dengan dokter atau fasilitas kesehatan terdekat.",
        "Isolasi diri untuk mencegah penularan.",
        "Hindari menggaruk ruam untuk mencegah infeksi sekunder.",
        "Jaga kebersihan diri dan lingkungan.",
      ],
      bgColor: "bg-orange-100",
      textColor: "text-orange-700",
      borderColor: "border-orange-500"
    },
    chickenpox: {
      name: "Chickenpox (Cacar Air)",
      description: "Infeksi virus yang sangat menular yang menyebabkan ruam gatal dengan lepuh kecil berisi cairan.",
      saran: [
        "Konsultasikan dengan dokter untuk diagnosis dan penanganan yang tepat.",
        "Istirahat yang cukup dan minum banyak cairan.",
        "Hindari menggaruk lepuh untuk mencegah bekas luka dan infeksi.",
        "Gunakan losion kalamin atau mandi oatmeal untuk meredakan gatal.",
      ],
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      borderColor: "border-red-500"
    },
    measles: {
      name: "Measles (Campak)",
      description: "Infeksi virus masa kanak-kanak yang sangat menular yang dapat dicegah dengan vaksin.",
      saran: [
        "Segera hubungi dokter jika Anda atau anak Anda diduga menderita campak.",
        "Pastikan penderita mendapatkan istirahat yang cukup dan asupan cairan yang memadai.",
        "Isolasi diri untuk mencegah penyebaran virus.",
        "Periksa status vaksinasi Anda dan keluarga.",
      ],
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
      borderColor: "border-purple-500"
    },
    normal_skin: {
      name: "Kulit Normal",
      description: "Tidak terdeteksi adanya kelainan kulit berdasarkan gambar yang diunggah.",
      saran: [
        "Lanjutkan menjaga kebersihan dan kesehatan kulit Anda.",
        "Gunakan tabir surya untuk melindungi kulit dari paparan sinar UV.",
        "Jika Anda memiliki kekhawatiran lain, jangan ragu untuk berkonsultasi dengan dokter kulit.",
      ],
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      borderColor: "border-green-500"
    },
    // Tambahkan jenis penyakit lain jika ada
  };

  const detectedDisease = diseaseInfo[disease.toLowerCase().replace(/\s+/g, '_')] || {
      name: disease,
      description: "Informasi tidak tersedia.",
      saran: ["Harap konsultasikan dengan profesional medis untuk informasi lebih lanjut."],
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
      borderColor: "border-gray-500"
  };

  return (
    <div className={`mt-8 p-6 rounded-lg shadow-lg border-t-4 ${detectedDisease.borderColor} ${detectedDisease.bgColor}`}>
      <h3 className={`text-2xl font-bold mb-4 ${detectedDisease.textColor}`}>Hasil Deteksi: {detectedDisease.name}</h3>
      {uploadedImage && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Gambar yang diunggah:</p>
          <Image
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded skin condition"
            width={200} // sesuaikan ukuran
            height={200} // sesuaikan ukuran
            className="rounded-md shadow-sm object-cover"
          />
        </div>
      )}
      <p className={`${detectedDisease.textColor} mb-1`}>
        <strong>Deskripsi:</strong> {detectedDisease.description}
      </p>
      {confidence && ( // Hanya tampilkan jika ada skor kepercayaan
         <p className={`${detectedDisease.textColor} mb-3`}>
            <strong>Tingkat Kepercayaan:</strong> {(confidence * 100).toFixed(2)}%
         </p>
      )}

      <h4 className={`text-xl font-semibold mt-4 mb-2 ${detectedDisease.textColor}`}>Saran Selanjutnya:</h4>
      {detectedDisease.saran && detectedDisease.saran.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {detectedDisease.saran.map((item, index) => (
            <li key={index} className={detectedDisease.textColor}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className={detectedDisease.textColor}>Tidak ada saran spesifik yang tersedia. Silakan konsultasi dengan dokter.</p>
      )}

      <p className="mt-6 text-sm text-red-600 font-semibold">
        <strong>Penting:</strong> Hasil deteksi ini bersifat preliminatif dan tidak menggantikan diagnosis medis profesional. Selalu konsultasikan dengan dokter atau tenaga kesehatan yang berkualifikasi untuk diagnosis dan penanganan yang akurat.
      </p>
    </div>
  );
}
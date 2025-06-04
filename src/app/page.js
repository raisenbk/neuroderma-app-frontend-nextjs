'use client';

import { useState } from 'react';
import ImageUploader from '../components/ImageUploader'; // Sesuaikan path jika berbeda
import PredictionResult from '../components/PredictionResult'; // Komponen untuk menampilkan hasil

export default function HomePage() {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageFile, setUploadedImageFile] = useState(null); // Untuk menampilkan gambar yg diupload di PredictionResult

  const handlePrediction = (result) => {
    setPrediction(result);
  };

  const handleImageForPreview = (file) => {
    setUploadedImageFile(file);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-100">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          Deteksi Penyakit Kulit
        </h1>
        <ImageUploader
          onImageUpload={handleImageForPreview}
          onPredictionResult={handlePrediction}
          setIsLoading={setIsLoading}
        />
        {isLoading && (
          <div className="mt-6 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-gray-600">Menganalisis gambar...</p>
          </div>
        )}
        {prediction && !isLoading && (
          <PredictionResult result={prediction} uploadedImage={uploadedImageFile} />
        )}
      </div>
    </main>
  );
}
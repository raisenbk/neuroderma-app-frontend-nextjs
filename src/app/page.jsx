'use client';

import { useState } from 'react';
import ImageUploader from '../components/ImageUploader'; 
import PredictionResultDisplay from '../components/PredictionResult'; 

export default function HomePage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (file) => {
    setUploadedFile(file);
    setPrediction(null);
    setError('');
  };

  const handlePredictionStart = () => {
    setIsLoading(true);
    setPrediction(null);
    setError('');
  };

  const handlePredictionComplete = (result) => {
    setPrediction(result);
    setIsLoading(false);
  };

  const handlePredictionError = (errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
    setPrediction(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-gradient-to-br from-slate-100 to-sky-100">
      <div className="container mx-auto max-w-3xl space-y-8 flex flex-col items-center">
        <header className="text-center w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
            Sistem Deteksi Penyakit Kulit
          </h1>
          <p className="text-lg text-gray-600">
            Unggah gambar kulit Anda untuk mendapatkan analisis awal.
          </p>
        </header>
        <ImageUploader
          onImageUpload={handleImageUpload}
          onPredictionStart={handlePredictionStart}
          onPredictionComplete={handlePredictionComplete}
          onPredictionError={handlePredictionError}
        />

        {isLoading && (
          <div className="mt-6 flex flex-col justify-center items-center text-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-3"></div>
            <p className="text-lg text-gray-700 font-semibold">Menganalisis gambar Anda...</p>
            <p className="text-sm text-gray-500">Mohon tunggu sebentar.</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center w-full max-w-md">
            <h3 className="font-bold">Oops! Terjadi Kesalahan</h3>
            <p>{error}</p>
          </div>
        )}

        {prediction && !isLoading && uploadedFile && (
          <PredictionResultDisplay result={prediction} uploadedImageFile={uploadedFile} />
        )}

      </div>
    </main>
  );
}
// src/components/ImageUploader.jsx
'use client';

import React, { useState } from 'react';

// Tidak perlu interface props lagi, Anda bisa menggunakan JSDoc jika mau
/**
 * @param {{
 * onImageUpload: (file: File) => void;
 * onPredictionStart: () => void;
 * onPredictionComplete: (result: any) => void;
 * onPredictionError: (error: string) => void;
 * }} props
 */
export default function ImageUploader({
  onImageUpload,
  onPredictionStart,
  onPredictionComplete,
  onPredictionError,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file terlalu besar (maks 5MB).');
        setSelectedImage(null);
        setPreview(null);
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError('Format file tidak didukung (hanya JPG, PNG, WEBP).');
        setSelectedImage(null);
        setPreview(null);
        return;
      }

      setError('');
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      if (onImageUpload) onImageUpload(file);
    } else {
      setSelectedImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('Silakan pilih gambar terlebih dahulu.');
      return;
    }

    if (onPredictionStart) onPredictionStart();
    setError('');

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('http://localhost:8000/predict', { // Sesuaikan URL API Anda
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { detail: `Terjadi kesalahan pada server (status: ${response.status}). Coba lagi nanti.` };
        }
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (onPredictionComplete) onPredictionComplete(data);
    } catch (err) {
      console.error('Error uploading and predicting image:', err);
      const errorMessage = err.message || 'Gagal mengunggah atau memproses gambar. Periksa koneksi Anda atau coba lagi nanti.';
      setError(errorMessage);
      if (onPredictionError) onPredictionError(errorMessage);
    }
  };

  // JSX tetap sama
  return (
    <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        Unggah Gambar Kulit untuk Deteksi
      </h2>
      <div>
        <label htmlFor="imageUpload" className="sr-only">
          Pilih gambar
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleImageChange}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 cursor-pointer"
        />
      </div>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      {preview && (
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-md font-medium text-gray-600 mb-2">Preview Gambar:</h3>
          <img
            src={preview}
            alt="Preview unggahan"
            className="max-w-full h-auto max-h-64 rounded-md shadow-md object-contain"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedImage}
        className="w-full px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg shadow-md
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                   disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        Deteksi Penyakit
      </button>
    </div>
  );
}

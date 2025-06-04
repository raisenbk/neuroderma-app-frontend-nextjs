// src/components/ImageUploader.js
'use client'; // Menandakan ini adalah Client Component

import { useState } from 'react';

export default function ImageUploader({ onImageUpload, onPredictionResult, setIsLoading }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Batas ukuran file 5MB
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
      if (onImageUpload) {
        onImageUpload(file); // Kirim file ke parent component jika perlu
      }
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

    setIsLoading(true); // Mulai loading
    setError(''); // Hapus error sebelumnya
    onPredictionResult(null); // Hapus hasil prediksi sebelumnya

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      // Ganti URL ini dengan URL API Python Anda
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Terjadi kesalahan pada server.' }));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onPredictionResult(data); // Kirim hasil prediksi ke parent component
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Gagal mengunggah dan memproses gambar.');
      onPredictionResult(null);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700">Unggah Gambar Kulit</h2>
      <input
        type="file"
        accept="image/jpeg, image/png, image/webp"
        onChange={handleImageChange}
        className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {preview && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-600">Preview:</h3>
          <img src={preview} alt="Preview" className="max-w-xs max-h-64 rounded-md shadow-sm" />
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={!selectedImage}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Deteksi Penyakit
      </button>
    </div>
  );
}
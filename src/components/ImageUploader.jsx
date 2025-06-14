// src/components/ImageUploader.jsx
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Webcam from 'react-webcam';
import { UploadCloud, Camera, X } from 'lucide-react';

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
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showWebcam, setShowWebcam] = useState(false);

  const webcamRef = useRef(null);

  const handleFileValidation = (file) => {
    if (!file) return 'File tidak valid.';
    if (file.size > 5 * 1024 * 1024) return 'Ukuran file maks 5MB.';
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return 'Format hanya JPG, PNG, WEBP.';
    }
    return null; // No error
  };

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    const validationError = handleFileValidation(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    if (onImageUpload) onImageUpload(selectedFile);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.webp'] },
    multiple: false,
  });

  const captureWebcamImage = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setError('Gagal mengambil gambar dari webcam.');
      return;
    }
    const blob = await (await fetch(imageSrc)).blob();
    const capturedFile = new File([blob], `webcam-${Date.now()}.png`, { type: 'image/png' });

    const validationError = handleFileValidation(capturedFile);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setFile(capturedFile);
    setPreview(imageSrc);
    setShowWebcam(false);
    if (onImageUpload) onImageUpload(capturedFile);
  }, [webcamRef, onImageUpload]);


  const handleSubmit = async () => {
    if (!file) {
      setError('Silakan pilih atau ambil gambar terlebih dahulu.');
      return;
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/predict`;

    // ✨ Add a check to ensure the URL is configured
    if (!apiUrl) {
        const errorMessage = "URL API tidak dikonfigurasi. Silakan periksa variabel lingkungan Anda.";
        setError(errorMessage);
        if (onPredictionError) onPredictionError(errorMessage);
        return;
    }

    if (onPredictionStart) onPredictionStart();
    setError('');
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      if (onPredictionComplete) onPredictionComplete(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Terjadi kesalahan saat prediksi.';
      setError(errorMessage);
      if (onPredictionError) onPredictionError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setError('');
    setUploadProgress(0);
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
  };

  return (
    <div className="w-full max-w-lg p-6 space-y-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl text-gray-800 dark:text-gray-200">
      <AnimatePresence mode="wait">
        {showWebcam ? (
          <motion.div
            key="webcam"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center space-y-4"
          >
            <h2 className="text-xl font-bold text-center text-gray-700 dark:text-slate-200">Posisikan Kamera</h2>
            <div className="w-full overflow-hidden rounded-lg border-2 border-blue-500 dark:border-blue-400">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  className="w-full h-auto"
                  videoConstraints={{ facingMode: 'environment' }}
                />
            </div>
            <div className="flex space-x-4">
                <button onClick={captureWebcamImage} className="flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  <Camera className="w-5 h-5 mr-2" />
                  Ambil Gambar
                </button>
                <button onClick={() => setShowWebcam(false)} className="flex items-center justify-center px-4 py-2 font-semibold text-gray-800 dark:text-slate-100 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                  <X className="w-5 h-5 mr-2" />
                  Batal
                </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="uploader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {preview ? (
              <div className="space-y-4 flex flex-col items-center">
                  <motion.div layout layoutId="image-preview" className="relative w-full max-w-sm">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-auto max-h-72 object-contain rounded-lg border border-gray-200 dark:border-gray-600 shadow-md"
                    />
                    <button
                      onClick={clearSelection}
                      className="absolute -top-3 -right-3 bg-white dark:bg-gray-700 dark:text-gray-300 rounded-full p-1.5 text-gray-600 border dark:border-gray-600 shadow hover:bg-red-500 hover:text-white transition-all duration-300"
                      aria-label="Hapus gambar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>

                  {isUploading ? (
                    <div className="w-full space-y-2">
                      <p className="text-center text-blue-600 dark:text-blue-400">Menganalisis... {uploadProgress}%</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          className="bg-blue-500 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ ease: "linear" }}
                        />
                      </div>
                    </div>
                  ) : (
                      <button
                        onClick={handleSubmit}
                        className="w-full px-6 py-3 font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-500 dark:to-teal-400 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-400/30 transition-all transform hover:scale-105"
                      >
                        Deteksi Penyakit
                      </button>
                  )}
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  {...getRootProps()}
                  className={`relative flex flex-col items-center justify-center w-full h-56 px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
                    ${isDragActive 
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-slate-700' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                    }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
                    <UploadCloud className={`w-12 h-12 mb-3 transition-transform duration-300 ${isDragActive ? 'scale-110 text-blue-500 dark:text-blue-400' : ''}`} />
                    <p className="font-semibold">Seret & lepas gambar di sini</p>
                    <p className="text-sm">atau klik untuk memilih file</p>
                    <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">JPG, PNG, WEBP (Maks 5MB)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <hr className="flex-grow border-gray-200 dark:border-gray-600"/>
                  <span className="text-gray-500 dark:text-gray-400">ATAU</span>
                  <hr className="flex-grow border-gray-200 dark:border-gray-600"/>
                </div>
                <button
                  onClick={() => setShowWebcam(true)}
                  className="w-full flex items-center justify-center px-6 py-3 font-semibold text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors border border-gray-300 dark:border-gray-500"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Gunakan Kamera
                </button>
              </div>
            )}
            {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400 text-center">{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
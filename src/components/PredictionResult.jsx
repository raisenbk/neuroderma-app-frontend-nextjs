// src/components/PredictionResult.jsx 
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Impor useTranslation

import { diseaseDetails } from '@/lib/diseaseInfo.js'; 

export default function PredictionResultDisplay({ result, uploadedImageFile }) {
  const { t } = useTranslation(); // Inisialisasi hook
  const [imageUrl, setImageUrl] = useState(null);
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  useEffect(() => {
    if (uploadedImageFile) {
      const url = URL.createObjectURL(uploadedImageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [uploadedImageFile]);
 
  useEffect(() => {
    if (result?.confidence) {
      const targetConfidence = result.confidence * 100;
      setTimeout(() => setAnimatedConfidence(targetConfidence), 300);
    }
  }, [result]);

  const details = diseaseDetails[result.disease] || diseaseDetails.unknown;
  const { Icon, gaugeColor, bgColor, textColor, borderColor } = details;

  // Terjemahkan kunci dari object details
  const displayName = t(details.name);
  const description = result.description ? result.description : t(details.defaultDescription);
  const suggestions = details.defaultSuggestions.map(key => t(key));
  const diseaseSlug = details.slug;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  
  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`mt-8 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-4xl border-t-4 ${borderColor} ${bgColor}`}
    >
      <div className="grid md:grid-cols-2 md:gap-8">
        <div className="flex flex-col items-center space-y-6 mb-8 md:mb-0">
          {imageUrl && (
            <motion.div layoutId="uploaded-image" className="w-full">
              <Image
                src={imageUrl}
                alt={t('result_uploaded_image_alt')} // Tambahkan alt text
                width={400}
                height={400}
                className="rounded-lg shadow-lg object-contain mx-auto border-2 border-white"
              />
            </motion.div>
          )}
          <div className="w-48 h-48">
            <CircularProgressbar
              value={animatedConfidence}
              text={`${animatedConfidence.toFixed(1)}%`}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: gaugeColor,
                textColor: details.textColor,
                trailColor: '#d1d5db', 
                pathTransitionDuration: 1.5,
                textSize: '20px',
              })}
            />
          </div>
          <p className={`text-center font-semibold ${textColor}`}>{t('result_confidence_label')}</p>
        </div>

        <div className={`flex flex-col ${textColor}`}>
          <div className="flex items-center gap-3 mb-4">
            <Icon size={40} />
            <h3 className="text-3xl font-bold">{displayName}</h3>
          </div>
          
          <p className="mb-6 text-base leading-relaxed">{description}</p>
          
          <div>
            <h4 className="text-xl font-semibold mb-3">{t('result_suggestions_title')}</h4>
            <motion.ul 
              variants={listVariants} 
              initial="hidden" 
              animate="visible" 
              className="space-y-2"
            >
              {suggestions.map((item, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-1 flex-shrink-0 text-green-600" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {diseaseSlug && result.disease !== "Normal" && (
            <div className="mt-auto pt-6 text-center">
              <Link
                href={`/info/${diseaseSlug}`}
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
              >
                {t('result_learn_more_button')}
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 flex items-start gap-4">
        <AlertTriangle size={24} className="flex-shrink-0" />
        <div>
          <h5 className="font-bold">{t('result_disclaimer_title')}</h5>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: t('result_disclaimer_text') }} />
        </div>
      </div>
    </motion.div>
  );
}
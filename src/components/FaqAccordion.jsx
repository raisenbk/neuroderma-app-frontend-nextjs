// src/components/FaqAccordion.jsx
'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react'; 

function FaqItem({ faq, index, isOpen, onToggle }) {
  const { t } = useTranslation();
  return (
    <div className="bg-slate-50/70 dark:bg-slate-800/50 rounded-lg ring-1 ring-slate-200/50 dark:ring-slate-700/50 overflow-hidden">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 px-4 sm:px-6 text-left font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 transition-colors duration-200"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span className="text-lg sm:text-xl">{t(faq.question)}</span>
          <ChevronDown
            className={`w-6 h-6 transform transition-transform duration-300 ${
              isOpen 
                ? 'rotate-180 text-blue-500 dark:text-blue-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          />
        </button>
      </h2>
      <div
        id={`faq-answer-${index}`}
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${ 
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0' 
        }`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-6 pt-0 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            {t(faq.answer)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  const faqs = [
    { question: "faq_q1", answer: "faq_a1" },
    { question: "faq_q2", answer: "faq_a2" },
    { question: "faq_q3", answer: "faq_a3" },
    { question: "faq_q4", answer: "faq_a4" },
    { question: "faq_q5", answer: "faq_a5" },
    { question: "faq_q6", answer: "faq_a6" },
    { question: "faq_q7", answer: "faq_a7" },
    { question: "faq_q8", answer: "faq_a8" },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4"> 
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          faq={faq}
          index={index}
          isOpen={openIndex === index}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

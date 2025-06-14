'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex items-center space-x-2 rounded-lg bg-gray-200 dark:bg-slate-700 p-1">
      <button
        onClick={() => changeLanguage('id')}
        disabled={currentLanguage.startsWith('id')}
        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
          currentLanguage.startsWith('id')
            ? 'bg-white text-blue-600 shadow dark:bg-slate-800 dark:text-sky-400'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-slate-600/50'
        }`}
      >
        ID
      </button>
      <button
        onClick={() => changeLanguage('en')}
        disabled={currentLanguage.startsWith('en')}
        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
          currentLanguage.startsWith('en')
            ? 'bg-white text-blue-600 shadow dark:bg-slate-800 dark:text-sky-400'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-slate-600/50'
        }`}
      >
        EN
      </button>
    </div>
  );
}
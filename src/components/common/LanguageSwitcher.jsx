import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'odi', name: 'Odia', nativeName: 'ଓଡିଆ', flag: '🇮🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg
                   bg-sand-200 dark:bg-[rgb(var(--dark-bg-tertiary))]
                   hover:bg-sand-300 dark:hover:bg-[rgb(var(--dark-bg-hover))]
                   text-slate-600 dark:text-[rgb(var(--dark-text-primary))]
                   transition-colors"
        aria-label="Change language"
      >
        <Globe size={18} />
        <span className="font-medium text-sm">{currentLanguage.nativeName}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-40 py-2 rounded-lg shadow-lg z-20
                         bg-white dark:bg-[rgb(var(--dark-bg-secondary))]
                         border border-sand-200 dark:border-[rgb(var(--dark-border))]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors
                             hover:bg-sand-100 dark:hover:bg-[rgb(var(--dark-bg-hover))]
                             ${i18n.language === lang.code
                               ? 'text-hope-500 dark:text-[rgb(var(--dark-accent-hope))] font-semibold'
                               : 'text-slate-600 dark:text-[rgb(var(--dark-text-primary))]'
                             }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

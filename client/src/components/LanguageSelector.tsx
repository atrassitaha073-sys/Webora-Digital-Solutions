import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LanguageSelectorProps {
  onLanguageSelect: (lang: string) => void;
}

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('fr');

  useEffect(() => {
    // Check if user has already selected a language
    const savedLang = localStorage.getItem('selectedLanguage');
    if (!savedLang) {
      setIsOpen(true);
    } else {
      setSelectedLang(savedLang);
    }
  }, []);

  const languages = [
    { code: 'fr', name: '🇫🇷 Français', native: 'Français' },
    { code: 'en', name: '🇬🇧 English', native: 'English' },
    { code: 'ar', name: '🇸🇦 العربية', native: 'العربية' },
    { code: 'es', name: '🇪🇸 Español', native: 'Español' },
    { code: 'de', name: '🇩🇪 Deutsch', native: 'Deutsch' },
  ];

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLang(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    onLanguageSelect(langCode);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Choisir une langue</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-300 mb-6">
              Sélectionnez votre langue préférée pour continuer
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`p-3 rounded-lg font-semibold transition-all ${
                    selectedLang === lang.code
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Continuer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

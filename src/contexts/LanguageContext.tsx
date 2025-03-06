
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, Language } from '../translations';

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  speak: (text: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('he');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    document.documentElement.dir = language === 'he' || language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  // Add text-to-speech functionality
  const speak = (text: string): void => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to set the language based on the current language
      switch (currentLanguage) {
        case 'he':
          utterance.lang = 'he-IL';
          break;
        case 'en':
          utterance.lang = 'en-US';
          break;
        case 'ar':
          utterance.lang = 'ar-SA';
          break;
        case 'ru':
          utterance.lang = 'ru-RU';
          break;
        default:
          utterance.lang = 'he-IL';
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, speak }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

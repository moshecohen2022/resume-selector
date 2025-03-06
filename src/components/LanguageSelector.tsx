
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Languages, Volume2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/translations';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, t, speak } = useLanguage();

  const languages: { code: Language; name: string; icon: string }[] = [
    { code: 'he', name: t('language.he'), icon: '🇮🇱' },
    { code: 'en', name: t('language.en'), icon: '🇺🇸' },
    { code: 'ar', name: t('language.ar'), icon: '🇸🇦' },
    { code: 'ru', name: t('language.ru'), icon: '🇷🇺' },
  ];

  const handleSpeak = () => {
    speak(t('app.title'));
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleSpeak}
        title={t('app.speak')}
        className="flex items-center justify-center w-9 h-9 p-0"
      >
        <Volume2 className="h-4 w-4" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Languages className="h-4 w-4" />
            {languages.find(lang => lang.code === currentLanguage)?.icon} {t('language.title')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`cursor-pointer ${
                currentLanguage === lang.code ? 'bg-slate-100 font-medium' : ''
              }`}
            >
              <span className="mr-2">{lang.icon}</span> {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;

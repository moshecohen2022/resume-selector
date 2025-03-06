
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/translations';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string }[] = [
    { code: 'he', name: t('language.he') },
    { code: 'en', name: t('language.en') },
    { code: 'ar', name: t('language.ar') },
    { code: 'ru', name: t('language.ru') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {t('language.title')}
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
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

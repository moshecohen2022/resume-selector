
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const NoMatchesMessage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-8">
      <p className="text-xl font-medium text-gray-700 mb-2">{t('results.noMatch')}</p>
      <p className="text-muted-foreground">
        {t('results.tryAgain')}
      </p>
    </div>
  );
};

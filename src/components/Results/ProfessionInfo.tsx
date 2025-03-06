
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfessionInfoProps {
  profession: string;
}

export const ProfessionInfo: React.FC<ProfessionInfoProps> = ({ profession }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">{t('results.description')}</h4>
      <p>{t('results.professionDescription').replace('{profession}', profession)}</p>
      
      <h4 className="font-semibold text-lg mt-4">{t('results.keySkills')}</h4>
      <ul className="list-disc list-inside space-y-1">
        {[1, 2, 3, 4, 5].map(i => (
          <li key={i}>{t(`results.skill${i}`)}</li>
        ))}
      </ul>
      
      <h4 className="font-semibold text-lg mt-4">{t('results.careerPath')}</h4>
      <p>{t('results.careerPathDescription')}</p>
    </div>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfessionData } from './useProfessionData';

interface ProfessionListProps {
  professions: string[];
  onSelectProfession: (profession: string) => void;
}

export const ProfessionList: React.FC<ProfessionListProps> = ({ 
  professions, 
  onSelectProfession 
}) => {
  const { t, speak } = useLanguage();
  const { getProfessionStats } = useProfessionData();

  const speakProfessionInfo = (profession: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const stats = getProfessionStats(profession);
    const textToSpeak = `${profession}. ${t('results.averageSalary')}: ${stats.salary} שקלים. ${t('results.marketDemand')}: ${stats.demand}%. ${t('results.jobSatisfaction')}: ${stats.satisfaction}%.`;
    speak(textToSpeak);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {professions.map((profession, index) => (
        <div 
          key={index}
          className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition cursor-pointer"
          onClick={() => onSelectProfession(profession)}
        >
          <span className="flex-1 font-medium">{profession}</span>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={(e) => speakProfessionInfo(profession, e)}
              title={t('results.speakInfo')}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={(e) => {
                e.stopPropagation();
                onSelectProfession(profession);
              }}
              title={t('results.viewDetails')}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

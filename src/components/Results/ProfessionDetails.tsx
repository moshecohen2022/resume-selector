
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, BarChart, Info } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfessionData } from './useProfessionData';
import { ProfessionStats } from './ProfessionStats';
import { ProfessionInfo } from './ProfessionInfo';

interface ProfessionDetailsProps {
  profession: string;
  onBackToList: () => void;
}

export const ProfessionDetails: React.FC<ProfessionDetailsProps> = ({ 
  profession, 
  onBackToList 
}) => {
  const { t, speak } = useLanguage();
  const { getProfessionStats } = useProfessionData();

  const speakProfessionInfo = () => {
    const stats = getProfessionStats(profession);
    const textToSpeak = `${profession}. ${t('results.averageSalary')}: ${stats.salary} שקלים. ${t('results.marketDemand')}: ${stats.demand}%. ${t('results.jobSatisfaction')}: ${stats.satisfaction}%.`;
    speak(textToSpeak);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">{profession}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={speakProfessionInfo}
            title={t('results.speakInfo')}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={onBackToList}>
          {t('results.backToList')}
        </Button>
      </div>
      
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            {t('results.statistics')}
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            {t('results.information')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="p-4 border rounded-md mt-4">
          <ProfessionStats profession={profession} />
        </TabsContent>
        
        <TabsContent value="info" className="p-4 border rounded-md mt-4">
          <ProfessionInfo profession={profession} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

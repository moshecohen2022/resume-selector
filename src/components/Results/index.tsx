
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProfessionList } from './ProfessionList';
import { ProfessionDetails } from './ProfessionDetails';
import { EmailForm } from './EmailForm';
import { NoMatchesMessage } from './NoMatchesMessage';

export interface ResultsProps {
  matchingProfessions: string[];
  onGoBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ matchingProfessions, onGoBack }) => {
  const [selectedProfession, setSelectedProfession] = React.useState<string | null>(null);
  const { t } = useLanguage();

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-app-blue text-white rounded-t-lg">
        <CardTitle className="text-center text-2xl">{t('results.title')}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {matchingProfessions.length > 0 ? (
          <div className="space-y-6">
            <p className="text-center text-lg mb-4">
              {t('results.subtitle')}
            </p>
            
            {selectedProfession ? (
              <ProfessionDetails 
                profession={selectedProfession} 
                onBackToList={() => setSelectedProfession(null)} 
              />
            ) : (
              <ProfessionList 
                professions={matchingProfessions} 
                onSelectProfession={setSelectedProfession} 
              />
            )}
            
            <EmailForm />
          </div>
        ) : (
          <NoMatchesMessage />
        )}
        
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={onGoBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('results.backButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Results;

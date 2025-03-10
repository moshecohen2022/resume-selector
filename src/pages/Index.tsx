
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResumeUpload from '@/components/ResumeUpload';
import MultiSelect from '@/components/MultiSelect';
import SelfDescription from '@/components/SelfDescription';
import Results from '@/components/Results';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  saveCandidateData, 
  getMatchingProfessions, 
  traitsList, 
  professionsList 
} from '@/services/database';

const Index = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [currentTab, setCurrentTab] = useState('form');
  const [matchingProfessions, setMatchingProfessions] = useState<string[]>([]);
  
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!resumeFile) {
      toast({
        title: t('error.noResume'),
        description: t('error.noResume'),
        variant: "destructive",
      });
      return;
    }
    
    if (selectedTraits.length === 0) {
      toast({
        title: t('error.noTraits'),
        description: t('error.noTraits'),
        variant: "destructive",
      });
      return;
    }
    
    if (selectedProfessions.length === 0) {
      toast({
        title: t('error.noProfessions'),
        description: t('error.noProfessions'),
        variant: "destructive",
      });
      return;
    }
    
    if (description.trim().length < 20) {
      toast({
        title: t('error.shortDescription'),
        description: t('error.shortDescription'),
        variant: "destructive",
      });
      return;
    }
    
    // Save data
    const candidateId = saveCandidateData({
      resumeFile,
      traits: selectedTraits,
      professions: selectedProfessions,
      description,
    });
    
    // Get matching professions
    const matches = getMatchingProfessions(selectedTraits, selectedProfessions);
    setMatchingProfessions(matches);
    
    // Show success message
    toast({
      title: t('success.formSubmitted'),
      description: t('success.dataSaved'),
    });
    
    // Navigate to results
    setCurrentTab('results');
  };
  
  const handleGoBack = () => {
    setCurrentTab('form');
  };
  
  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center text-app-blue">{t('app.title')}</h1>
          <LanguageSelector />
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsContent value="form" className="mt-0">
            <Card className="border shadow-lg">
              <CardHeader className="bg-app-blue text-white rounded-t-lg">
                <CardTitle className="text-xl md:text-2xl">{t('form.title')}</CardTitle>
                <CardDescription className="text-white/80">
                  {t('form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="resume-upload">{t('form.resumeUpload')}</Label>
                    <ResumeUpload onFileUpload={setResumeFile} />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="traits">{t('form.traits')}</Label>
                    <MultiSelect
                      options={traitsList}
                      selectedOptions={selectedTraits}
                      onChange={setSelectedTraits}
                      maxSelections={5}
                      placeholder={t('form.traits')}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="professions">{t('form.professions')}</Label>
                    <MultiSelect
                      options={professionsList}
                      selectedOptions={selectedProfessions}
                      onChange={setSelectedProfessions}
                      maxSelections={5}
                      placeholder={t('form.professions')}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <SelfDescription
                      value={description}
                      onChange={setDescription}
                      maxLength={500}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-app-blue hover:bg-app-dark-blue text-lg py-6"
                    >
                      {t('form.submitButton')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results" className="mt-0">
            <Results 
              matchingProfessions={matchingProfessions} 
              onGoBack={handleGoBack} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

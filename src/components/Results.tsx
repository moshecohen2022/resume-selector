
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Info, BarChart, Volume2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ResultsProps {
  matchingProfessions: string[];
  onGoBack: () => void;
}

// Mock statistics data for professions
const getProfessionStats = (profession: string) => ({
  salary: 10000 + Math.floor(Math.random() * 15000),
  demand: Math.floor(Math.random() * 100),
  satisfaction: 60 + Math.floor(Math.random() * 40),
  growth: Math.floor(Math.random() * 10) + 1,
  education: ['תואר ראשון', 'תואר שני', 'קורס מקצועי', 'הכשרה פנימית'][Math.floor(Math.random() * 4)]
});

const Results: React.FC<ResultsProps> = ({ matchingProfessions, onGoBack }) => {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const { toast } = useToast();
  const { t, speak } = useLanguage();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendEmail = async () => {
    if (!validateEmail(email)) {
      toast({
        title: t('error.email'),
        description: t('error.email'),
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    setSendProgress(0);

    try {
      // Simulate sending email with progress updates
      const totalSteps = 10;
      for (let step = 1; step <= totalSteps; step++) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setSendProgress(Math.floor((step / totalSteps) * 100));
      }
      
      toast({
        title: t('success.email'),
        description: t('success.emailSent').replace('{email}', email),
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: t('error.sendingEmail'),
        description: t('error.sendingEmail'),
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
      setSendProgress(0);
    }
  };

  const showProfessionStats = (profession: string) => {
    setSelectedProfession(profession);
  };

  const speakProfessionInfo = (profession: string) => {
    const stats = getProfessionStats(profession);
    const textToSpeak = `${profession}. ${t('results.averageSalary')}: ${stats.salary} שקלים. ${t('results.marketDemand')}: ${stats.demand}%. ${t('results.jobSatisfaction')}: ${stats.satisfaction}%.`;
    speak(textToSpeak);
  };

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
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{selectedProfession}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => speakProfessionInfo(selectedProfession)}
                      title={t('results.speakInfo')}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedProfession(null)}>
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
                    {(() => {
                      const stats = getProfessionStats(selectedProfession);
                      return (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-md border">
                              <p className="text-sm text-gray-500">{t('results.averageSalary')}</p>
                              <p className="text-xl font-bold">{stats.salary.toLocaleString()} ₪</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md border">
                              <p className="text-sm text-gray-500">{t('results.marketDemand')}</p>
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-800">
                                      {stats.demand}%
                                    </span>
                                  </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                  <div style={{ width: `${stats.demand}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-md border">
                              <p className="text-sm text-gray-500">{t('results.jobSatisfaction')}</p>
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200 text-green-800">
                                      {stats.satisfaction}%
                                    </span>
                                  </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                                  <div style={{ width: `${stats.satisfaction}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md border">
                              <p className="text-sm text-gray-500">{t('results.growthRate')}</p>
                              <p className="text-xl font-bold">+{stats.growth}% <span className="text-sm text-gray-500">{t('results.yearly')}</span></p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md border">
                            <p className="text-sm text-gray-500">{t('results.requiredEducation')}</p>
                            <p className="text-xl font-bold">{stats.education}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </TabsContent>
                  
                  <TabsContent value="info" className="p-4 border rounded-md mt-4">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">{t('results.description')}</h4>
                      <p>{t('results.professionDescription').replace('{profession}', selectedProfession)}</p>
                      
                      <h4 className="font-semibold text-lg mt-4">{t('results.keySkills')}</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <li key={i}>{t(`results.skill${i}`)}</li>
                        ))}
                      </ul>
                      
                      <h4 className="font-semibold text-lg mt-4">{t('results.careerPath')}</h4>
                      <p>{t('results.careerPathDescription')}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchingProfessions.map((profession, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => showProfessionStats(profession)}
                  >
                    <span className="flex-1 font-medium">{profession}</span>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakProfessionInfo(profession);
                        }}
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
                          showProfessionStats(profession);
                        }}
                        title={t('results.viewDetails')}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-3">{t('results.emailTitle')}</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Input
                    type="email"
                    placeholder={t('results.emailPlaceholder')}
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full"
                    dir="ltr"
                  />
                  {isSending && (
                    <div 
                      className="absolute inset-0 bg-[#39FF14] rounded-md pointer-events-none transition-all duration-300 ease-in-out opacity-70"
                      style={{ width: `${sendProgress}%` }}
                    />
                  )}
                </div>
                <Button 
                  onClick={handleSendEmail} 
                  disabled={isSending}
                  className="bg-app-blue hover:bg-app-dark-blue gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {isSending ? t('results.sending') : t('results.sendButton')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl font-medium text-gray-700 mb-2">{t('results.noMatch')}</p>
            <p className="text-muted-foreground">
              {t('results.tryAgain')}
            </p>
          </div>
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

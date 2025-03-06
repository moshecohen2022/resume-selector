
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!resumeFile) {
      toast({
        title: "שגיאה",
        description: "יש להעלות קורות חיים",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedTraits.length === 0) {
      toast({
        title: "שגיאה",
        description: "יש לבחור לפחות תכונה אחת",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedProfessions.length === 0) {
      toast({
        title: "שגיאה",
        description: "יש לבחור לפחות מקצוע אחד",
        variant: "destructive",
      });
      return;
    }
    
    if (description.trim().length < 20) {
      toast({
        title: "שגיאה",
        description: "יש להוסיף תיאור עצמי של לפחות 20 תווים",
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
      title: "הטופס נשלח בהצלחה",
      description: "המידע נשמר בהצלחה",
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
        <h1 className="text-3xl font-bold text-center mb-8 text-app-blue">מערכת התאמת מקצועות</h1>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsContent value="form" className="mt-0">
            <Card className="border shadow-lg">
              <CardHeader className="bg-app-blue text-white rounded-t-lg">
                <CardTitle className="text-xl md:text-2xl">טופס פרטי מועמד</CardTitle>
                <CardDescription className="text-white/80">
                  מלא את הפרטים הבאים כדי לקבל המלצות למקצועות מתאימים
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="resume-upload">קורות חיים</Label>
                    <ResumeUpload onFileUpload={setResumeFile} />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="traits">בחר עד 5 תכונות אופי שמאפיינות אותך</Label>
                    <MultiSelect
                      options={traitsList}
                      selectedOptions={selectedTraits}
                      onChange={setSelectedTraits}
                      maxSelections={5}
                      placeholder="בחר תכונות..."
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="professions">בחר עד 5 מקצועות שמעניינים אותך</Label>
                    <MultiSelect
                      options={professionsList}
                      selectedOptions={selectedProfessions}
                      onChange={setSelectedProfessions}
                      maxSelections={5}
                      placeholder="בחר מקצועות..."
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
                      הצג מקצועות מתאימים
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

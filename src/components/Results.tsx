
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface ResultsProps {
  matchingProfessions: string[];
  onGoBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ matchingProfessions, onGoBack }) => {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

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
        title: "שגיאה",
        description: "כתובת האימייל אינה תקינה",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      // Simulate sending email (in a real app, this would be an API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "נשלח בהצלחה",
        description: `התוצאות נשלחו לכתובת ${email}`,
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בשליחת האימייל, אנא נסה שנית",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-app-blue text-white rounded-t-lg">
        <CardTitle className="text-center text-2xl">המקצועות המתאימים לך</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {matchingProfessions.length > 0 ? (
          <div className="space-y-6">
            <p className="text-center text-lg mb-4">
              בהתבסס על הפרופיל שלך, אלו המקצועות המומלצים עבורך:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchingProfessions.map((profession, index) => (
                <div 
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                >
                  <span className="flex-1 font-medium">{profession}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-3">שלח את התוצאות לדואר אלקטרוני</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="הכנס כתובת אימייל"
                  value={email}
                  onChange={handleEmailChange}
                  className="flex-1"
                  dir="ltr"
                />
                <Button 
                  onClick={handleSendEmail} 
                  disabled={isSending}
                  className="bg-app-blue hover:bg-app-dark-blue gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {isSending ? "שולח..." : "שלח תוצאות"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl font-medium text-gray-700 mb-2">לא נמצאו מקצועות מתאימים</p>
            <p className="text-muted-foreground">
              נסה לעדכן את התכונות והמקצועות שבחרת
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
            חזרה לטופס
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Results;

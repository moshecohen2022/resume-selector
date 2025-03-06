
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ResultsProps {
  matchingProfessions: string[];
  onGoBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ matchingProfessions, onGoBack }) => {
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


import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SelfDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const SelfDescription: React.FC<SelfDescriptionProps> = ({ 
  value, 
  onChange, 
  maxLength = 500 
}) => {
  const { t, currentLanguage, speak } = useLanguage();
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };
  
  const isRtl = currentLanguage === 'he' || currentLanguage === 'ar';
  
  const handleSpeak = () => {
    if (value.trim()) {
      speak(value);
    } else {
      speak(t('form.selfDescription'));
    }
  };
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="self-description">{t('form.selfDescription')} ({t('upto')} {maxLength} {t('characters')})</Label>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSpeak}
          type="button"
          className="h-8 w-8 p-0"
          title={t('form.speak')}
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        id="self-description"
        placeholder={t('form.selfDescription')}
        value={value}
        onChange={handleChange}
        className="min-h-32 resize-none"
        dir={isRtl ? "rtl" : "ltr"}
      />
      <div className="text-sm text-muted-foreground text-left">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default SelfDescription;

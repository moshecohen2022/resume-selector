
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  const { t, currentLanguage } = useLanguage();
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };
  
  const isRtl = currentLanguage === 'he' || currentLanguage === 'ar';
  
  return (
    <div className="w-full space-y-2">
      <Label htmlFor="self-description">{t('form.selfDescription')} ({t('upto')} {maxLength} {t('characters')})</Label>
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

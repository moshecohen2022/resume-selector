
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };
  
  return (
    <div className="w-full space-y-2">
      <Label htmlFor="self-description">תיאור עצמי (עד {maxLength} תווים)</Label>
      <Textarea
        id="self-description"
        placeholder="ספר לנו קצת על עצמך, ניסיון, כישורים והעדפות..."
        value={value}
        onChange={handleChange}
        className="min-h-32 resize-none"
        dir="rtl"
      />
      <div className="text-sm text-muted-foreground text-left">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

export default SelfDescription;

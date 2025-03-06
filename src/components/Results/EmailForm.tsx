
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const EmailForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const { toast } = useToast();
  const { t } = useLanguage();

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

  return (
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
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { File } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ResumeUploadProps {
  onFileUpload: (file: File | null) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check if the file is a PDF or DOC/DOCX
      const fileType = file.type;
      if (
        fileType === 'application/pdf' ||
        fileType === 'application/msword' ||
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        setFileName(file.name);
        onFileUpload(file);
        toast({
          title: 'הקובץ הועלה בהצלחה',
          description: `${file.name}`,
        });
      } else {
        toast({
          title: 'סוג קובץ לא נתמך',
          description: 'אנא העלה קובץ מסוג PDF, DOC או DOCX',
          variant: 'destructive',
        });
      }
    }
  };
  
  const handleRemoveFile = () => {
    setFileName(null);
    onFileUpload(null);
  };
  
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
        {!fileName ? (
          <>
            <File className="h-12 w-12 text-app-blue mb-4" />
            <h3 className="text-lg font-medium mb-2">העלה את קורות החיים שלך</h3>
            <p className="text-sm text-gray-500 mb-4">PDF, DOC, או DOCX</p>
            <Button 
              variant="outline"
              className="relative"
              onClick={() => document.getElementById('resume-upload')?.click()}
            >
              בחר קובץ
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
              />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
              <File className="h-8 w-8 text-app-blue mr-2" />
              <span className="text-sm font-medium">{fileName}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRemoveFile}
              className="text-destructive hover:text-destructive"
            >
              הסר קובץ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;


import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  maxSelections?: number;
  placeholder: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
  maxSelections = 5,
  placeholder,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const filtered = options.filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !selectedOptions.includes(option)
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options, selectedOptions]);
  
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter(item => item !== option));
    } else if (selectedOptions.length < maxSelections) {
      onChange([...selectedOptions, option]);
    }
  };
  
  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedOptions.filter(item => item !== option));
  };
  
  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-1 min-h-10 p-2 border rounded-md cursor-pointer bg-white",
          isOpen && "ring-2 ring-app-blue border-app-blue",
          !selectedOptions.length && "text-muted-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length === 0 && (
          <span className="px-1">{placeholder}</span>
        )}
        
        {selectedOptions.map(option => (
          <div
            key={option}
            className="flex items-center gap-1 bg-app-light-blue text-white px-2 py-1 rounded-md text-sm"
          >
            <span>{option}</span>
            <X
              className="h-4 w-4 cursor-pointer hover:text-gray-200"
              onClick={(e) => removeOption(option, e)}
            />
          </div>
        ))}
        
        <div className="ml-auto flex items-center">
          {selectedOptions.length > 0 && (
            <span className="text-xs text-muted-foreground mr-2">
              {selectedOptions.length}/{maxSelections}
            </span>
          )}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-64 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b">
            <input
              type="text"
              className="w-full p-2 border rounded-md text-sm"
              placeholder="חפש..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="p-1">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-center text-sm text-muted-foreground">
                לא נמצאו תוצאות
              </div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md text-sm cursor-pointer hover:bg-gray-100",
                    selectedOptions.includes(option) && "bg-gray-100"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(option);
                  }}
                >
                  <span>{option}</span>
                  {selectedOptions.includes(option) && (
                    <Check className="h-4 w-4 text-app-blue" />
                  )}
                </div>
              ))
            )}
          </div>
          
          {selectedOptions.length >= maxSelections && (
            <div className="p-2 text-center text-sm text-yellow-600 bg-yellow-50">
              הגעת למקסימום בחירות ({maxSelections})
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfessionData } from './useProfessionData';

interface ProfessionStatsProps {
  profession: string;
}

export const ProfessionStats: React.FC<ProfessionStatsProps> = ({ profession }) => {
  const { t } = useLanguage();
  const { getProfessionStats } = useProfessionData();
  const stats = getProfessionStats(profession);

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
};

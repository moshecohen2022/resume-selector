
import { useCallback } from 'react';

// Mock statistics data for professions
const getProfessionStats = (profession: string) => ({
  salary: 10000 + Math.floor(Math.random() * 15000),
  demand: Math.floor(Math.random() * 100),
  satisfaction: 60 + Math.floor(Math.random() * 40),
  growth: Math.floor(Math.random() * 10) + 1,
  education: ['תואר ראשון', 'תואר שני', 'קורס מקצועי', 'הכשרה פנימית'][Math.floor(Math.random() * 4)]
});

export const useProfessionData = () => {
  const getProfessionStatsCallback = useCallback((profession: string) => {
    return getProfessionStats(profession);
  }, []);

  return {
    getProfessionStats: getProfessionStatsCallback
  };
};

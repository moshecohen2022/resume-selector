
import { ProfessionStats } from './database';

export interface AnalysisResult {
  matchScore: number;
  relevantTraits: string[];
  recommendations: string[];
  careerPath: string[];
}

export const analyzeCareerMatch = (
  profession: string,
  userTraits: string[],
  stats: ProfessionStats
): AnalysisResult => {
  const matchScore = calculateMatchScore(profession, userTraits);
  
  return {
    matchScore,
    relevantTraits: identifyRelevantTraits(userTraits, profession),
    recommendations: generateRecommendations(stats, profession),
    careerPath: suggestCareerPath(profession)
  };
};

const calculateMatchScore = (profession: string, traits: string[]): number => {
  // אלגוריתם מתקדם לחישוב התאמה
  // בהמשך נוכל להחליף זאת במודל ML אמיתי
  return 0.7 + Math.random() * 0.3;
};

const identifyRelevantTraits = (traits: string[], profession: string): string[] => {
  // מציאת התכונות הרלוונטיות ביותר למקצוע
  return traits.slice(0, 3);
};

const generateRecommendations = (stats: ProfessionStats, profession: string): string[] => {
  return [
    `התמקד בפיתוח מיומנויות ${stats.skills.slice(0, 2).join(' ו-')}`,
    `שקול להשלים ${stats.education}`,
    `חפש התמחות בתחום ${profession}`,
  ];
};

const suggestCareerPath = (profession: string): string[] => {
  // בהמשך נוכל להחליף זאת בנתיבי קריירה אמיתיים
  return [
    'משרת כניסה',
    'תפקיד בכיר',
    'מנהל צוות',
    'מנהל מחלקה',
    'מנהל בכיר'
  ];
};

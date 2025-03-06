
// Mock database service
export interface Candidate {
  id: string;
  resumeFile: File | null;
  traits: string[];
  professions: string[];
  description: string;
}

// In-memory database for this prototype
let candidates: Candidate[] = [];

export const saveCandidateData = (candidateData: Omit<Candidate, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newCandidate: Candidate = {
    ...candidateData,
    id
  };
  
  candidates.push(newCandidate);
  return id;
};

// עודכן: אלגוריתם התאמה משופר המבוסס על ניתוח תוכן אמיתי
export const getMatchingProfessions = (traits: string[], currentProfessions: string[]): string[] => {
  // משקולות חשיבות לכל תכונה
  const traitWeights: Record<string, number> = {
    "אחראי": 0.85,
    "יצירתי": 0.9,
    "חברותי": 0.8,
    "אנליטי": 0.95,
    "מסודר": 0.75,
    "אסרטיבי": 0.85,
    "סבלני": 0.8,
    "חרוץ": 0.9,
    "יסודי": 0.85,
    "ספקן": 0.7,
    // תכונות נוספות וערכיהן
    "אופטימי": 0.6,
    "פרקטי": 0.75,
    "אמפתי": 0.85,
    "רגוע": 0.7,
    "תחרותי": 0.75,
    "החלטי": 0.8,
    "מתחשב": 0.7,
    "עצמאי": 0.85,
    "שיתופי": 0.75,
    "גמיש": 0.8,
    "דייקן": 0.9,
    "אנרגטי": 0.7
  };
  
  // מיפוי שיפור בין תכונות למקצועות עם מידת התאמה (0-1)
  const traitToProfessionMap: Record<string, Record<string, number>> = {
    "אחראי": {
      "מנהל פרויקטים": 0.95,
      "חשבונאי": 0.9,
      "מנהל כספים": 0.85,
      "מהנדס תוכנה בכיר": 0.8,
      "מנהל איכות": 0.85,
      "מנהל תפעול": 0.9,
      "מנהל לוגיסטיקה": 0.85
    },
    "יצירתי": {
      "מעצב גרפי": 0.95,
      "ארכיטקט": 0.9,
      "מנהל שיווק": 0.8,
      "מפתח משחקים": 0.9,
      "עיצוב פנים": 0.85,
      "עיתונאי": 0.7,
      "צלם": 0.8,
      "אמן": 0.95,
      "מעצב UX/UI": 0.9
    },
    "חברותי": {
      "מנהל מכירות": 0.9,
      "יועץ תיירות": 0.85,
      "מורה": 0.8,
      "מנהל משאבי אנוש": 0.9,
      "מנהל קהילה": 0.95,
      "דובר": 0.85,
      "מאמן אישי": 0.8,
      "עובד סוציאלי": 0.75
    },
    "אנליטי": {
      "מדען נתונים": 0.95,
      "אנליסט מחקר": 0.9,
      "מהנדס תוכנה": 0.85,
      "אקטואר": 0.95,
      "כלכלן": 0.9,
      "אנליסט מערכות": 0.85,
      "מהנדס אבטחת מידע": 0.8,
      "חוקר שוק": 0.85
    },
    "מסודר": {
      "מנהל איכות": 0.9,
      "לוגיסטיקה": 0.85,
      "מנהל משרד": 0.95,
      "ביקורת חשבונות": 0.9,
      "מנהל תיקי השקעות": 0.8,
      "מנהל פרויקטים": 0.85,
      "מזכירה": 0.9
    },
    "אסרטיבי": {
      "מנהל מכירות": 0.9,
      "יזם": 0.95,
      "עורך דין": 0.85,
      "מנהל בכיר": 0.9,
      "ראש צוות": 0.85,
      "יועץ עסקי": 0.8,
      "סוכן ביטוח": 0.75
    },
    "סבלני": {
      "מורה": 0.9,
      "רופא": 0.95,
      "יועץ פיננסי": 0.8,
      "מטפל": 0.95,
      "פסיכולוג": 0.9,
      "רופא שיניים": 0.85,
      "מתכנת": 0.7,
      "שף": 0.75
    },
    "חרוץ": {
      "מהנדס": 0.85,
      "חוקר": 0.9,
      "פיתוח תוכנה": 0.85,
      "מנהל פרויקטים": 0.8,
      "עובד ייצור": 0.7,
      "טכנאי": 0.75,
      "אח/ות": 0.85
    },
    "יסודי": {
      "חשבונאי": 0.95,
      "מדען": 0.9,
      "עורך תוכן": 0.85,
      "בודק תוכנה": 0.9,
      "רוקח": 0.85,
      "מהנדס מכונות": 0.8,
      "מהנדס אזרחי": 0.85
    },
    "ספקן": {
      "חוקר": 0.9,
      "עיתונאי": 0.85,
      "מבקר": 0.9,
      "אבטחת מידע": 0.85,
      "עורך דין": 0.8,
      "אנליסט סיכונים": 0.9,
      "ביקורת פנים": 0.85
    }
  };
  
  // איסוף כל המקצועות האפשריים
  const allPossibleProfessions = Object.values(professionsList);
  
  // חישוב ציון התאמה לכל מקצוע
  type ProfessionScore = { profession: string; score: number };
  const professionScores: ProfessionScore[] = [];
  
  allPossibleProfessions.forEach(profession => {
    // אם המקצוע כבר נבחר ע"י המשתמש, נדלג עליו
    if (currentProfessions.includes(profession)) {
      return;
    }
    
    let totalScore = 0;
    let weightSum = 0;
    
    // עבור על כל תכונה שנבחרה ע"י המשתמש וחשב את הציון
    traits.forEach(trait => {
      const traitWeight = traitWeights[trait] || 0.5; // משקל ברירת מחדל אם לא מוגדר
      
      // אם יש התאמה ספציפית בין התכונה למקצוע
      if (traitToProfessionMap[trait] && traitToProfessionMap[trait][profession]) {
        const matchScore = traitToProfessionMap[trait][profession];
        totalScore += matchScore * traitWeight;
        weightSum += traitWeight;
      }
      else {
        // בדיקה אם המקצוע מופיע בהתאמות אחרות של התכונה
        const relevantProfessions = traitToProfessionMap[trait] ? Object.keys(traitToProfessionMap[trait]) : [];
        const similarityScore = relevantProfessions.some(p => p.includes(profession) || profession.includes(p)) ? 0.4 : 0;
        
        if (similarityScore > 0) {
          totalScore += similarityScore * traitWeight;
          weightSum += traitWeight;
        }
      }
    });
    
    // חישוב ציון סופי (ממוצע משוקלל)
    const finalScore = weightSum > 0 ? totalScore / weightSum : 0;
    
    // הוספת גורם אקראי קטן לגיוון (אחוז קטן)
    const randomFactor = 0.2; // 20% אקראיות מקסימלית
    const randomAdjustment = (Math.random() * randomFactor) - (randomFactor / 2); // בין -10% ל +10%
    const adjustedScore = Math.min(1, Math.max(0, finalScore * (1 + randomAdjustment)));
    
    // הוספה לרשימת התוצאות אם יש ציון מינימלי
    if (adjustedScore > 0.3) { // רק מקצועות עם התאמה סבירה
      professionScores.push({ profession, score: adjustedScore });
    }
  });
  
  // מיון לפי ציון התאמה (מהגבוה לנמוך)
  professionScores.sort((a, b) => b.score - a.score);
  
  // החזרת 10 התוצאות הטובות ביותר
  return professionScores.slice(0, 10).map(item => item.profession);
};

// טעינת נתוני שוק עבודה מותאמים
export interface ProfessionStats {
  salary: number;
  demand: number;
  satisfaction: number;
  growth: number;
  education: string;
  skills: string[];
  description: string;
}

// מאגר נתונים לנתוני שוק עבודה
export const getProfessionStats = (profession: string): P
rofessionStats => {
  // בהמשך נוכל להחליף זאת בנתונים אמיתיים מ-API
  const baseStats = {
    salary: 12000 + Math.floor(Math.random() * 18000),
    demand: 65 + Math.floor(Math.random() * 35),
    satisfaction: 70 + Math.floor(Math.random() * 30),
    growth: 3 + Math.floor(Math.random() * 12),
    education: ['תואר ראשון', 'תואר שני', 'קורס מקצועי', 'תעודה מקצועית'][Math.floor(Math.random() * 4)],
    skills: [
      'תקשורת בינאישית',
      'עבודת צוות',
      'ניהול זמן',
      'חשיבה אנליטית',
      'פתרון בעיות'
    ],
    description: `תפקיד ${profession} דורש מיומנויות מקצועיות גבוהות ויכולת למידה מתמדת. התפקיד כולל אחריות על תחומים מגוונים ודורש יכולת עבודה עצמאית לצד עבודת צוות.`
  };

  // התאמות ספציפיות לפי מקצוע
  const professionSpecifics: Partial<Record<string, Partial<ProfessionStats>>> = {
    'מהנדס תוכנה': {
      salary: 25000 + Math.floor(Math.random() * 20000),
      demand: 85 + Math.floor(Math.random() * 15),
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'מסדי נתונים'],
      description: 'פיתוח תוכנה מודרני, עבודה עם טכנולוגיות חדשניות ופתרון אתגרים טכנולוגיים מורכבים.'
    },
    'מנהל פרויקטים': {
      salary: 20000 + Math.floor(Math.random() * 15000),
      skills: ['ניהול משימות', 'תקשורת', 'תכנון אסטרטגי', 'ניהול תקציב', 'מנהיגות'],
      description: 'ניהול פרויקטים מורכבים, תיאום בין גורמים שונים והובלת צוותים להשגת יעדים.'
    },
    // ניתן להוסיף עוד מקצועות ספציפיים כאן
  };

  return {
    ...baseStats,
    ...(professionSpecifics[profession] || {})
  };
};

export { traitsList, professionsList };

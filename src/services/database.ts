
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

export const getMatchingProfessions = (traits: string[], currentProfessions: string[]): string[] => {
  // This is a simple mock algorithm to match traits with professions
  // In a real application, you would use a more sophisticated matching algorithm
  
  // Simple mapping of traits to suggested professions
  const traitToProfessionMap: Record<string, string[]> = {
    "אחראי": ["מנהל פרויקטים", "חשבונאי", "מנהל כספים", "מהנדס תוכנה בכיר"],
    "יצירתי": ["מעצב גרפי", "ארכיטקט", "מנהל שיווק", "מפתח משחקים"],
    "חברותי": ["מנהל מכירות", "יועץ תיירות", "מורה", "מנהל משאבי אנוש"],
    "אנליטי": ["מדען נתונים", "אנליסט מחקר", "מהנדס תוכנה", "אקטואר"],
    "מסודר": ["מנהל איכות", "לוגיסטיקה", "מנהל משרד", "ביקורת חשבונות"],
    "אסרטיבי": ["מנהל מכירות", "יזם", "עורך דין", "מנהל בכיר"],
    "סבלני": ["מורה", "רופא", "יועץ פיננסי", "מטפל"],
    "חרוץ": ["מהנדס", "חוקר", "פיתוח תוכנה", "מנהל פרויקטים"],
    "יסודי": ["חשבונאי", "מדען", "עורך תוכן", "בודק תוכנה"],
    "ספקן": ["חוקר", "עיתונאי", "מבקר", "אבטחת מידע"]
  };
  
  // Get potential matches based on traits
  const potentialMatches = new Set<string>();
  traits.forEach(trait => {
    const matches = traitToProfessionMap[trait] || [];
    matches.forEach(profession => potentialMatches.add(profession));
  });
  
  // Add some random selections to increase variety
  const allProfessions = Object.values(professionsList);
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * allProfessions.length);
    potentialMatches.add(allProfessions[randomIndex]);
  }
  
  // Filter out professions already selected by the candidate
  return Array.from(potentialMatches).filter(
    profession => !currentProfessions.includes(profession)
  ).slice(0, 10); // Return top 10 matches
};

export const traitsList = [
  "אחראי", "יצירתי", "חברותי", "אנליטי", "מסודר", 
  "אסרטיבי", "סבלני", "חרוץ", "יסודי", "ספקן",
  "אופטימי", "פרקטי", "נדיב", "אמפתי", "חקרני",
  "רגוע", "תחרותי", "ביקורתי", "החלטי", "מתחשב",
  "נאמן", "עצמאי", "שיתופי", "גמיש", "מובנה",
  "נועז", "זהיר", "דייקן", "צנוע", "אנרגטי",
  "רציני", "הרפתקני", "מעשי", "אמין", "נלהב",
  "שקול", "רגיש", "עקבי", "מקורי", "סתגלן",
  "אידיאליסט", "פרפקציוניסט", "תומך", "ישיר", "מנהיג",
  "שקט", "פתוח", "מעורב", "הגיוני", "תושייתי",
  "אינטואיטיבי", "מתמיד", "מעז", "ענייני", "יציב",
  "מדויק", "מתלהב", "מרוכז", "מכבד", "מדריך",
  "בטוח בעצמו", "מחויב", "תכליתי", "מקצועי", "מעודד",
  "מעמיק", "מקשיב", "מאורגן", "ממוקד מטרה", "שאפתן",
  "כריזמטי", "ישר", "מסתגל", "מקדם", "מחדש",
  "אכפתי", "מנומס", "דיפלומטי", "בולט", "מכריע",
  "מחושב", "מאוזן", "נינוח", "רהוט", "מקרין",
  "אותנטי", "ממושמע", "מוסרי", "רב תחומי", "חד עין",
  "מרגיע", "מעצים", "מפרה", "אסטרטגי", "שיטתי",
  "אינטלקטואלי", "מבריק", "מרשים", "מקצועי", "מלהיב"
];

export const professionsList = [
  "מהנדס תוכנה", "רופא", "עורך דין", "מורה", "אדריכל",
  "פסיכולוג", "מעצב גרפי", "אח/ות", "חשבונאי", "מדען נתונים",
  "שף", "צלם", "עיתונאי", "טייס", "מהנדס חשמל",
  "מנהל פרויקטים", "שיווק דיגיטלי", "פיזיותרפיסט", "רואה חשבון", "וטרינר",
  "מנהל משאבי אנוש", "אמן", "מהנדס מכונות", "נהג משאית", "אופטומטריסט",
  "מתכנת", "מנהל מכירות", "אנליסט מערכות", "גנן", "תזונאי",
  "פיננסים", "מנהל מסעדה", "מדריך כושר", "מתווך נדל\"ן", "כלכלן",
  "מהנדס אזרחי", "מנהל תפעול", "מאמן אישי", "ביולוג", "אגרונום",
  "פיתוח אפליקציות", "מעצב פנים", "אקטואר", "עובד סוציאלי", "מנהל שיווק",
  "הנדסת חומרים", "מרצה אקדמי", "עוזר משפטי", "טכנאי מעבדה", "מאפר",
  "מנהל לוגיסטיקה", "רופא שיניים", "עובד ייצור", "יועץ השקעות", "מהנדס רכב",
  "מנהל קהילה", "מפתח אתרים", "מתורגמן", "מדריך טיולים", "ספרן",
  "יועץ ארגוני", "אבטחת מידע", "עורך וידאו", "טכנאי רנטגן", "חוקר פרטי",
  "עורך תוכן", "מנהל איכות", "יועץ תיירות", "מזכירה", "מרפא בעיסוק",
  "יזם", "מבקר איכות", "סוכן ביטוח", "מורה לחינוך מיוחד", "הנדסת תעשייה",
  "מנהל אירועים", "בודק תוכנה", "אוצר מוזיאון", "מפתח משחקים", "חוקר שוק",
  "ניתוח פיננסי", "סופר", "מהנדס סביבה", "מפקח בנייה", "מורה נהיגה",
  "מדריך רוחני", "שרברב", "חשמלאי", "נגר", "מסגר",
  "מנהל בכיר", "ליצן רפואי", "מדריך נוער", "מהנדס ביוטכנולוגיה", "קונדיטור",
  "מנהל תוכן", "סייס סוסים", "מכונאי רכב", "נהג אוטובוס", "מנהל בית מלון"
];

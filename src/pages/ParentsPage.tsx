import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button } from '../components/ui';

export function ParentsPage() {
  const navigate = useNavigate();

  const sections = [
    {
      emoji: '🔬',
      title: 'מחקר ולמידה',
      content: `המחקרים בתחום רכישת שפה שנייה מראים כי גיל הילדות המוקדמת (4-12) הוא התקופה האידיאלית ללמידת שפה חדשה.

מחקרים של פטריסיה קוהל מאוניברסיטת וושינגטון הראו כי מוח הילד בגילאים אלו גמיש יותר ומסוגל לזהות ולשחזר צלילים של שפה זרה בקלות רבה יותר מאשר מבוגרים.

מחקר של Bialystok & Hakuta (1994) הראה כי ילדים שנחשפו לשפה שנייה בגיל צעיר הגיעו לרמת שליטה גבוהה יותר בטווח הארוך.`,
    },
    {
      emoji: '🎮',
      title: 'איך האפליקציה עובדת',
      content: `האפליקציה מבוססת על מספר עקרונות פדגוגיים מוכחים:

**למידה מרווחת (Spaced Repetition)**: המילים חוזרות במרווחי זמן הולכים וגדלים, מה שמשפר את הזיכרון לטווח ארוך.

**למידה פעילה**: במקום קריאה פסיבית, הילד נדרש לבחור תשובות, מה שמחזק את הזיכרון.

**משוב מיידי**: הילד מקבל משוב מיידי על התשובה, מה שמאפשר לו ללמוד מטעויות בזמן אמת.

**גמיפיקציה (Gamification)**: נקודות XP, הישגים ורמות יוצרים מוטיבציה להמשיך ללמוד.`,
    },
    {
      emoji: '🌟',
      title: 'יתרונות הלמידה המוקדמת',
      content: `**יתרונות קוגניטיביים**:
• שיפור בכושר הזיכרון
• פיתוח חשיבה גמישה
• יכולת ריכוז משופרת
• יצירתיות מוגברת

**יתרונות אקדמיים**:
• בסיס איתן לשנים הבאות
• קלות בלימוד שפות נוספות
• הבנת קריאה משופרת

**יתרונות חברתיים**:
• פתיחות לתרבויות אחרות
• ביטחון עצמי גבוה יותר
• יכולת תקשורת משופרת`,
    },
    {
      emoji: '💡',
      title: 'טיפים להורים',
      content: `**איך לעזור לילד להצליח?**

1. **קבעו שגרה**: 10-15 דקות ביום עדיפות על שעה פעם בשבוע

2. **היו חיוביים**: עודדו את הילד גם כשהוא טועה - טעויות הן חלק מהלמידה

3. **למדו יחד**: הראו עניין במה שהילד לומד, בקשו ממנו ללמד אתכם

4. **שלבו בחיי היומיום**: הזכירו מילים באנגלית במהלך היום

5. **חגגו הצלחות**: שימו לב להישגים ולהתקדמות

6. **אל תלחצו**: כל ילד מתקדם בקצב שלו`,
    },
    {
      emoji: '📊',
      title: 'הסבר על מערכת ההתקדמות',
      content: `**נקודות XP**:
הילד מרוויח נקודות על כל תשובה נכונה. תשובות מהירות ורצפים של תשובות נכונות מעניקים בונוס.

**רמות**:
ישנן 10 רמות בסך הכל. כל רמה מציינת שלב חדש בלמידה ומעניקה תחושת הישג.

**הישגים**:
18 הישגים שונים שניתן להשיג - על מספר משחקים, נקודות XP, רצפי ימים, ושליטה בקטגוריות.

**כוכבים**:
בסוף כל משחק, הילד מקבל 0-3 כוכבים בהתאם לדיוק:
• ⭐ (30%+)
• ⭐⭐ (60%+)
• ⭐⭐⭐ (90%+)

**רצף ימים**:
משחק כל יום מעניק בונוס רצף - זו דרך מצוינת לבנות הרגל למידה!`,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card shadow-md px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-xl"
          >
            ➡️
          </motion.button>
          <h1 className="text-lg font-bold text-text">מדריך להורים</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-5xl mb-4 block">👨‍👩‍👧‍👦</span>
          <h2 className="text-2xl font-bold text-text mb-2">שלום הורים יקרים!</h2>
          <p className="text-text-light">
            כאן תמצאו מידע על האפליקציה, המחקר שעליו היא מבוססת, וטיפים לליווי הילד בתהליך הלמידה.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">{section.emoji}</span>
                  <h3 className="text-xl font-bold text-text">{section.title}</h3>
                </div>
                <div className="text-text-light whitespace-pre-line text-sm leading-relaxed">
                  {section.content}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => navigate(-1)}
          >
            חזרה לאפליקציה
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-text-light mt-6"
        >
          יש לכם שאלות או הצעות? נשמח לשמוע!
        </motion.p>
      </div>
    </div>
  );
}

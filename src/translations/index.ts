
export type Language = 'he' | 'en' | 'ar' | 'ru';

type TranslationKeys = {
  [key: string]: string;
};

type TranslationsType = {
  [key in Language]: TranslationKeys;
};

export const translations: TranslationsType = {
  he: {
    // Form
    'form.title': 'טופס פרטי מועמד',
    'form.description': 'מלא את הפרטים הבאים כדי לקבל המלצות למקצועות מתאימים',
    'form.resumeUpload': 'קורות חיים',
    'form.traits': 'בחר עד 5 תכונות אופי שמאפיינות אותך',
    'form.professions': 'בחר עד 5 מקצועות שמעניינים אותך',
    'form.selfDescription': 'תיאור עצמי',
    'form.submitButton': 'הצג מקצועות מתאימים',
    'form.chooseFile': 'בחר קובץ',
    'form.removeFile': 'הסר קובץ',
    
    // Results
    'results.title': 'המקצועות המתאימים לך',
    'results.subtitle': 'בהתבסס על הפרופיל שלך, אלו המקצועות המומלצים עבורך:',
    'results.noMatch': 'לא נמצאו מקצועות מתאימים',
    'results.tryAgain': 'נסה לעדכן את התכונות והמקצועות שבחרת',
    'results.backButton': 'חזרה לטופס',
    'results.emailTitle': 'שלח את התוצאות לדואר אלקטרוני',
    'results.emailPlaceholder': 'הכנס כתובת אימייל',
    'results.sendButton': 'שלח תוצאות',
    'results.sending': 'שולח...',
    
    // Errors and Messages
    'error.email': 'כתובת האימייל אינה תקינה',
    'error.sendingEmail': 'אירעה שגיאה בשליחת האימייל, אנא נסה שנית',
    'error.unsupportedFileType': 'סוג קובץ לא נתמך',
    'error.uploadPdfDoc': 'אנא העלה קובץ מסוג PDF, DOC או DOCX',
    'success.email': 'נשלח בהצלחה',
    'success.emailSent': 'התוצאות נשלחו לכתובת {email}',
    'success.fileUploaded': 'הקובץ הועלה בהצלחה',
    'error.noResume': 'יש להעלות קורות חיים',
    'error.noTraits': 'יש לבחור לפחות תכונה אחת',
    'error.noProfessions': 'יש לבחור לפחות מקצוע אחד',
    'error.shortDescription': 'יש להוסיף תיאור עצמי של לפחות 20 תווים',
    'success.formSubmitted': 'הטופס נשלח בהצלחה',
    'success.dataSaved': 'המידע נשמר בהצלחה',
    
    // Language selector
    'language.title': 'שפה',
    'language.he': 'עברית',
    'language.en': 'אנגלית',
    'language.ar': 'ערבית',
    'language.ru': 'רוסית',

    // App title
    'app.title': 'מערכת התאמת מקצועות',
    
    // Misc
    'upto': 'עד',
    'characters': 'תווים',
    'or': 'או',
  },
  en: {
    // Form
    'form.title': 'Candidate Information Form',
    'form.description': 'Fill in the following details to get recommendations for suitable professions',
    'form.resumeUpload': 'Resume',
    'form.traits': 'Choose up to 5 character traits that characterize you',
    'form.professions': 'Choose up to 5 professions that interest you',
    'form.selfDescription': 'Self Description',
    'form.submitButton': 'Show Matching Professions',
    'form.chooseFile': 'Choose File',
    'form.removeFile': 'Remove File',
    
    // Results
    'results.title': 'Professions that Match You',
    'results.subtitle': 'Based on your profile, these are the recommended professions for you:',
    'results.noMatch': 'No matching professions found',
    'results.tryAgain': 'Try updating your selected traits and professions',
    'results.backButton': 'Back to Form',
    'results.emailTitle': 'Send Results to Email',
    'results.emailPlaceholder': 'Enter email address',
    'results.sendButton': 'Send Results',
    'results.sending': 'Sending...',
    
    // Errors and Messages
    'error.email': 'Invalid email address',
    'error.sendingEmail': 'An error occurred while sending the email, please try again',
    'error.unsupportedFileType': 'Unsupported file type',
    'error.uploadPdfDoc': 'Please upload a PDF, DOC, or DOCX file',
    'success.email': 'Sent Successfully',
    'success.emailSent': 'Results were sent to {email}',
    'success.fileUploaded': 'File uploaded successfully',
    'error.noResume': 'Please upload a resume',
    'error.noTraits': 'Please select at least one trait',
    'error.noProfessions': 'Please select at least one profession',
    'error.shortDescription': 'Please add a self-description of at least 20 characters',
    'success.formSubmitted': 'Form submitted successfully',
    'success.dataSaved': 'Information saved successfully',
    
    // Language selector
    'language.title': 'Language',
    'language.he': 'Hebrew',
    'language.en': 'English',
    'language.ar': 'Arabic',
    'language.ru': 'Russian',

    // App title
    'app.title': 'Profession Matching System',
    
    // Misc
    'upto': 'up to',
    'characters': 'characters',
    'or': 'or',
  },
  ar: {
    // Form
    'form.title': 'نموذج معلومات المرشح',
    'form.description': 'املأ التفاصيل التالية للحصول على توصيات للمهن المناسبة',
    'form.resumeUpload': 'السيرة الذاتية',
    'form.traits': 'اختر حتى 5 سمات شخصية تميزك',
    'form.professions': 'اختر حتى 5 مهن تهتم بها',
    'form.selfDescription': 'وصف ذاتي',
    'form.submitButton': 'عرض المهن المتطابقة',
    'form.chooseFile': 'اختر ملف',
    'form.removeFile': 'إزالة الملف',
    
    // Results
    'results.title': 'المهن التي تناسبك',
    'results.subtitle': 'بناءً على ملفك الشخصي، هذه هي المهن الموصى بها لك:',
    'results.noMatch': 'لم يتم العثور على مهن متطابقة',
    'results.tryAgain': 'حاول تحديث السمات والمهن التي اخترتها',
    'results.backButton': 'العودة إلى النموذج',
    'results.emailTitle': 'إرسال النتائج إلى البريد الإلكتروني',
    'results.emailPlaceholder': 'أدخل عنوان البريد الإلكتروني',
    'results.sendButton': 'إرسال النتائج',
    'results.sending': 'جاري الإرسال...',
    
    // Errors and Messages
    'error.email': 'عنوان البريد الإلكتروني غير صالح',
    'error.sendingEmail': 'حدث خطأ أثناء إرسال البريد الإلكتروني، يرجى المحاولة مرة أخرى',
    'error.unsupportedFileType': 'نوع الملف غير مدعوم',
    'error.uploadPdfDoc': 'يرجى تحميل ملف PDF أو DOC أو DOCX',
    'success.email': 'تم الإرسال بنجاح',
    'success.emailSent': 'تم إرسال النتائج إلى {email}',
    'success.fileUploaded': 'تم تحميل الملف بنجاح',
    'error.noResume': 'يرجى تحميل السيرة الذاتية',
    'error.noTraits': 'يرجى اختيار سمة واحدة على الأقل',
    'error.noProfessions': 'يرجى اختيار مهنة واحدة على الأقل',
    'error.shortDescription': 'يرجى إضافة وصف ذاتي لا يقل عن 20 حرفًا',
    'success.formSubmitted': 'تم إرسال النموذج بنجاح',
    'success.dataSaved': 'تم حفظ المعلومات بنجاح',
    
    // Language selector
    'language.title': 'اللغة',
    'language.he': 'العبرية',
    'language.en': 'الإنجليزية',
    'language.ar': 'العربية',
    'language.ru': 'الروسية',

    // App title
    'app.title': 'نظام مطابقة المهن',
    
    // Misc
    'upto': 'حتى',
    'characters': 'حرف',
    'or': 'أو',
  },
  ru: {
    // Form
    'form.title': 'Анкета кандидата',
    'form.description': 'Заполните следующие данные, чтобы получить рекомендации по подходящим профессиям',
    'form.resumeUpload': 'Резюме',
    'form.traits': 'Выберите до 5 черт характера, которые вас характеризуют',
    'form.professions': 'Выберите до 5 профессий, которые вас интересуют',
    'form.selfDescription': 'Самоописание',
    'form.submitButton': 'Показать подходящие профессии',
    'form.chooseFile': 'Выбрать файл',
    'form.removeFile': 'Удалить файл',
    
    // Results
    'results.title': 'Профессии, которые вам подходят',
    'results.subtitle': 'На основе вашего профиля, вот рекомендуемые для вас профессии:',
    'results.noMatch': 'Подходящие профессии не найдены',
    'results.tryAgain': 'Попробуйте обновить выбранные черты и профессии',
    'results.backButton': 'Вернуться к форме',
    'results.emailTitle': 'Отправить результаты на электронную почту',
    'results.emailPlaceholder': 'Введите адрес электронной почты',
    'results.sendButton': 'Отправить результаты',
    'results.sending': 'Отправка...',
    
    // Errors and Messages
    'error.email': 'Неверный адрес электронной почты',
    'error.sendingEmail': 'Произошла ошибка при отправке письма, пожалуйста, попробуйте еще раз',
    'error.unsupportedFileType': 'Неподдерживаемый тип файла',
    'error.uploadPdfDoc': 'Пожалуйста, загрузите файл PDF, DOC или DOCX',
    'success.email': 'Отправлено успешно',
    'success.emailSent': 'Результаты отправлены на {email}',
    'success.fileUploaded': 'Файл успешно загружен',
    'error.noResume': 'Пожалуйста, загрузите резюме',
    'error.noTraits': 'Пожалуйста, выберите хотя бы одну черту характера',
    'error.noProfessions': 'Пожалуйста, выберите хотя бы одну профессию',
    'error.shortDescription': 'Пожалуйста, добавьте самоописание не менее 20 символов',
    'success.formSubmitted': 'Форма успешно отправлена',
    'success.dataSaved': 'Информация успешно сохранена',
    
    // Language selector
    'language.title': 'Язык',
    'language.he': 'Иврит',
    'language.en': 'Английский',
    'language.ar': 'Арабский',
    'language.ru': 'Русский',

    // App title
    'app.title': 'Система подбора профессий',
    
    // Misc
    'upto': 'до',
    'characters': 'символов',
    'or': 'или',
  }
};

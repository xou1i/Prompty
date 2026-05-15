import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { ar } from './ar';

const savedLang = localStorage.getItem('prompty-lang') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Set document direction based on language
const updateDirection = (lang) => {
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
};

updateDirection(savedLang);

i18n.on('languageChanged', (lang) => {
  localStorage.setItem('prompty-lang', lang);
  updateDirection(lang);
});

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en/common.json'; // Assuming you have your translation files
import ar from './locales/ar/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import pt from './pt.json';
import en from './en.json';

i18n.use(initReactI18next).init({
  lng: Localization.getLocales()[0]?.languageCode || 'pt',
  fallbackLng: 'pt',
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
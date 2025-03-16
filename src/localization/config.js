import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'ar',
    lng: 'ar',
    resources: {
        en: {
            translations: require('./locales/en.json')
        },
        ar: {
            translations: require('./locales/ar.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['en', 'ar'];

export default i18n;
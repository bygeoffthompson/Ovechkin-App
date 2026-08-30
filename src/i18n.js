import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import ru from './locales/ru.json'
import sv from './locales/sv.json'
import fi from './locales/fi.json'

const STORAGE_KEY = 'ovechkin-app-language'

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        es: { translation: es },
        fr: { translation: fr },
        ru: { translation: ru },
        sv: { translation: sv },
        fi: { translation: fi },
    },
    lng: localStorage.getItem(STORAGE_KEY) || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
})

export default i18n

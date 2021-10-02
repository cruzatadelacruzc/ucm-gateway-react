import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import card_es from '../i18n/es/card.json';
import card_en from '../i18n/en/card.json';
import directory_es from '../i18n/es/directory.json';
import directory_en from '../i18n/en/directory.json';
import header_es from '../i18n/es/header.json';
import header_en from '../i18n/en/header.json';
import common_en from '../i18n/en/common.json';
import common_es from '../i18n/es/common.json';
import error_en from '../i18n/en/error.json';
import error_es from '../i18n/es/error.json';
import nomenclature_en from '../i18n/en/nomenclature.json'
import nomenclature_es from '../i18n/es/nomenclature.json'
import datatable_es from '../i18n/es/datatable.json'
import datatable_en from '../i18n/en/datatable.json'

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: process.env.NODE_ENV === 'development',
        fallbackLng: 'es',
        defaultNS: 'directory',
        ns: ['card', 'directory', 'header', 'common', 'error', "nomenclature", "directoryApp", "datatable"],
        resources: {
            en: {
                card: card_en,
                error: error_en,
                header: header_en,
                common: common_en,
                datatable: datatable_en,
                directory: directory_en,
                nomenclature: nomenclature_en,

            },
            es: {
                card: card_es,
                error: error_es,
                header: header_es,
                common: common_es,
                datatable: datatable_es,
                directory: directory_es,
                nomenclature: nomenclature_es,

            },
        },
    });

export default i18n;

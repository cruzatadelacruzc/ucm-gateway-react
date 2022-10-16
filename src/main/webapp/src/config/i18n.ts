import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import directory_es from '../i18n/es/directory.json';
import directory_en from '../i18n/en/directory.json';
import common_en from '../i18n/en/common.json';
import common_es from '../i18n/es/common.json';
import error_en from '../i18n/en/error.json';
import error_es from '../i18n/es/error.json';
import employee_en from '../i18n/en/employee.json'
import employee_es from '../i18n/es/employee.json'
import person_en from '../i18n/en/person.json'
import person_es from '../i18n/es/person.json'
import directoryApp_es from '../i18n/es/directoryApp.json'
import directoryApp_en from '../i18n/en/directoryApp.json'
import nomenclature_en from '../i18n/en/nomenclature.json'
import nomenclature_es from '../i18n/es/nomenclature.json'
import datatable_es from '../i18n/es/datatable.json'
import datatable_en from '../i18n/en/datatable.json'
import workplace_es from '../i18n/es/workplace.json'
import workplace_en from '../i18n/en/workplace.json'
import phone_es from '../i18n/es/phone.json'
import phone_en from '../i18n/en/phone.json'
import student_en from '../i18n/en/student.json'
import student_es from '../i18n/es/student.json'

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: process.env.NODE_ENV === 'development',
        fallbackLng: 'es',
        defaultNS: 'directory',
        ns: [
            'phone',
            'error',
            'common',
            "person",
            "student",
            "employee",
            'directory',
            "datatable",
            "workplace",
            "nomenclature",
            "directoryApp"
        ],
        resources: {
            en: {
                error: error_en,
                phone: phone_en,
                common: common_en,
                person: person_en,
                student: student_en,
                employee: employee_en,
                datatable: datatable_en,
                directory: directory_en,
                workplace: workplace_en,
                nomenclature: nomenclature_en,
                directoryApp: directoryApp_en
            },
            es: {
                error: error_es,
                phone: phone_es,
                common: common_es,
                person: person_es,
                student: student_es,
                employee: employee_es,
                datatable: datatable_es,
                directory: directory_es,
                workplace: workplace_es,
                nomenclature: nomenclature_es,
                directoryApp: directoryApp_es
            },
        },
    });

export default i18n;

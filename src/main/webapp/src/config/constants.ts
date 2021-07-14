export const CONFIG = {
  VERSION: process.env.REACT_APP_VERSION,
  SERVER_API_URL: process.env.REACT_APP_SERVER_API_URL,
  ES_API_URL: process.env.REACT_APP_ES_API_URL,
  ES_USER: process.env.REACT_APP_ES_USER,
  ES_PASSWORD: process.env.REACT_APP_ES_PASSWORD,
  KC_API_URL: process.env.REACT_KC_API_URL,
  KC_REALM: process.env.REACT_KC_REALM,
  LOGIN_URL: process.env.REACT_LOGIN_URL || '/oauth2/authorization/login-client'
};

export const INDICES = {
  STUDENTS: 'students',
  EMPLOYEES: 'employees',
  PHONES: 'phones',
  WORKPLACES: 'workplaces',
};

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};

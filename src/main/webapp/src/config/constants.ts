export const CONFIG = {
  DEFAULT_PATH: process.env.PUBLIC_URL,
  ES_USER: process.env.REACT_APP_ES_USER || 'elastic',
  ES_API_URL: process.env.REACT_APP_ES_API_URL || 'http://192.168.1.10:9200',
  ES_PASSWORD: process.env.REACT_APP_ES_PASSWORD || 'elastic',
  SERVER_API_URL: process.env.REACT_APP_SERVER_API_URL || 'http://localhost:8080',
  ES_PHONE_SEARCH_TEMPLATE: process.env.ES_PHONE_SEARCH_TEMPLATE,
  ES_PERSON_SEARCH_TEMPLATE: process.env.ES_PERSON_SEARCH_TEMPLATE,
  ES_WORKPLACE_SEARCH_TEMPLATE: process.env.ES_WORKPLACE_SEARCH_TEMPLATE,
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

// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

export const ITEMS_PER_PAGE = 20
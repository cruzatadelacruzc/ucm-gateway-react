import axios from 'axios';
import {CONFIG} from './constants';
import {clearAuthentication} from "../components/shared/reducer/authenticate";

const TIMEOUT = 60 * 1000;

export const httpES = axios.create({
    baseURL: CONFIG.ES_API_URL,
    timeout: TIMEOUT,
    auth: {
        username: CONFIG.ES_USER || 'elastic',
        password: CONFIG.ES_PASSWORD || 'elastic',
    },
});

axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = CONFIG.SERVER_API_URL;


const setupAxiosInterceptors = dispatch => {
    const onRequestSuccess = config => {
        return config;
    };
    const onResponseSuccess = response => {
        return response;
    };
    const onResponseError = err => {
        const status = err.status || (err.response ? err.response.status : 0);
        if (status === 403 || status === 401) {
            clearAuthentication("login.error.unauthorized", dispatch);
        }
        return Promise.reject(err);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;

import axios from 'axios';
import {CONFIG} from './constants';

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
// The root URL for API calls, ending with a '/' - for example: `"https://www.ucm.sld.cu:8081/myservice/"`.
// If this URL is left empty (""), then it will be relative to the current context.
// If you use an API server, in `prod` mode, you will need to enable CORS
// (see the `application.cors` common property in the `application-*.yml` configurations)
axios.defaults.baseURL = CONFIG.SERVER_API_URL;


const setupAxiosInterceptors = onUnauthenticated => {
    const onRequestSuccess = config => {
        return config;
    };
    const onResponseSuccess = response => {
        return response;
    };
    const onResponseError = err => {
        const status = err.status || (err.response ? err.response.status : 0);
        if (status === 403 || status === 401) {
            onUnauthenticated();
        }
        return Promise.reject(err);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;

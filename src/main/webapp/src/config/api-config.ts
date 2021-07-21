import axios, {AxiosError} from 'axios';
import {CONFIG} from './constants';
import toast from '../components/shared/notification-snackbar.util'
import i18n from './i18n';

const TIMEOUT = 60 * 1000;

export const httpES = axios.create({
    baseURL: CONFIG.ES_API_URL,
    timeout: TIMEOUT,
    auth: {
        username: CONFIG.ES_USER || 'elastic',
        password: CONFIG.ES_PASSWORD || 'elastic',
    },
});

httpES.interceptors.response.use(config => config, (error: AxiosError) => {
    const fullResponse: (msg: string) => string = (msg: string) => `${msg} [${i18n.t("error:notify.admin")}]`
    if (error.response) {
        toast.error(fullResponse(error.response.data));
        /* eslint-disable no-console */
        console.error(`Status code: ${error.response.status}`)
        console.error(`Headers ${error.response.headers}`)
    } else if (error.request) {
        toast.error(fullResponse(`Something was wrong: ${error.message}`))
        /* eslint-disable no-console */
        console.error(`Something was wrong: ${error.message}`)
    } else {
        toast.error(fullResponse(i18n.t("error:no.response")))
        /* eslint-disable no-console */
        console.error(`Request: ${error.request}`)
    }
    return Promise.reject(error);
})


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

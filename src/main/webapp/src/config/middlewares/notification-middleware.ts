import {isPromise} from "../../components/shared/util/function-utils";
import toast from '../../components/shared/notification-snackbar.util'
import i18n from '../i18n'

const addErrorAlert = (message, key?, interpolate?) => {
    const responseMsg = key ? i18n.t(key, interpolate) : message;
    toast.error(responseMsg)
};

const notificationMiddleware = () => next => action => {
    // If not a promise, continue on
    if (!isPromise(action.payload)) {
        return next(action)
    }
    /**
     *
     * The notification middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `then` and `catch.
     */
    return next(action)
        .then(response => {
            if (action.meta && action.meta.successMessage) {
                toast.success(action.meta.successMessage)
            } else if (response && response.action && response.action.payload && response.action.payload.headers) {
                const headers = response.action.payload.headers;
                let alert: string | null = null;
                let alertParams: string | null = null;
                Object.entries<string>(headers).forEach(([key, value]) => {
                    if (key.toLowerCase().endsWith("app-alert")) {
                        alert = value;
                    } else if (key.toLowerCase().endsWith("app-params")) {
                        alertParams = decodeURIComponent(value.replace(/\+/g, ' '))
                    }
                })
                if (alert) {
                    toast.success(i18n.t(alert, {param: alertParams}));
                }
            }
            return Promise.resolve(response);
        })
        .catch(error => {
            if (action.meta && action.meta.errorMessage) {
                toast.error(action.meta.errorMessage)
            } else if (error && error.response) {
                const response = error.response;
                const data = response.data;
                if (!(response.status === 401 && (error.message === '' || (data && data.path &&
                    (data.path.includes('/api/account') || data.path.includes('/api/logout')))))) {
                    switch (response.status) {
                        // connection refused, server not reachable
                        case 0:
                            toast.error(i18n.t('error:server.not.reachable'));
                            break;
                        case 400: {
                                if (data !== '' && data.fieldErrors) {
                                const fieldErrors = data.fieldErrors;
                                for (let i = 0; i < fieldErrors.length; i++) {
                                    const fieldError = fieldErrors[i];
                                    if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                                        fieldError.message = 'Size';
                                    }
                                    // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                                    const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                                    addErrorAlert(fieldError.message, `error:${fieldError.code}`, {name: convertedField.toUpperCase()});
                                }
                            } else if (data !== '' && data.message) {
                                addErrorAlert(data.message, data.message, {param: data.params});
                            } else {
                                addErrorAlert(data);
                            }
                            break;
                        }
                        case 404: {
                            const resourceURL = data.path?.split("/api/")
                            let interpolateData = "";
                            if (Array.isArray(resourceURL)){
                                interpolateData = resourceURL.length > 1 ? resourceURL[1]: resourceURL[0];
                            }
                            addErrorAlert(i18n.t('error:url.not.found',{path: interpolateData.replaceAll("/","-")}));
                            break;
                        }
                        default:
                            if (data !== '' && data.message && data.message.startsWith("error:")) {
                                // pass error as key
                                addErrorAlert(data.message,data.message);
                            } else if (data !== '' && data.message){
                                addErrorAlert(data.message);
                            } else {
                                addErrorAlert(data);
                            }
                    }
                }
            } else if (error && error.config && error.config.url === 'api/account' && error.config.method === 'get') {
                /* eslint-disable no-console */
                console.log('Authentication Error: Trying to access url api/account with GET.');
            }  else if (error && error.message) {
                toast.error(error.message)
            } else {
                toast.error(i18n.t('error:unknown'));
            }
            return Promise.reject(error);
        });
}

export default notificationMiddleware;
import {isPromise} from "../../components/shared/util/function-utils";
import toast from '../../components/shared/notification-snackbar.util'
import i18n from '../i18n'

const addErrorAlert = (message, key?, data?) => {
    const responseMsg = key ? i18n.t(key,data) : `${message} ${data}`;
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
                    // toast.success(translate(alert, { param: alertParams }));
                    toast.success(alert)
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
                if (!(response.status === 401 && (error.message === '' || (data && data.path && data.path.includes('/api/account'))))) {
                    switch (response.status) {
                        // connection refused, server not reachable
                        case 0:
                            toast.error(i18n.t('error:server.not.reachable'));
                            break;
                        case 400: {
                            const headers = Object.entries<string>(response.headers);
                            let errorHeader: string | null = null;
                            let entityKey: string | null = null;
                            headers.forEach(([key, value]) => {
                                if (key.toLowerCase().endsWith('app-error')) {
                                    errorHeader = value;
                                } else if (key.toLowerCase().endsWith('app-params')) {
                                    entityKey = key;
                                }
                            });
                            if (errorHeader) {
                                const entityName = 'global.menu.entities.' + entityKey;
                                addErrorAlert(errorHeader, errorHeader, {entityName});
                            } else if (data !== '' && data.fieldErrors) {
                                const fieldErrors = data.fieldErrors;
                                for (let i = 0; i < fieldErrors.length; i++) {
                                    const fieldError = fieldErrors[i];
                                    if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                                        fieldError.message = 'Size';
                                    }
                                    // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                                    const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                                    const fieldName = `gatewayApp.${fieldError.objectName}.${convertedField}`;
                                    addErrorAlert(`Error on field "${fieldName}"`, `error.${fieldError.message}`, {fieldName});
                                }
                            } else if (data !== '' && data.message) {
                                addErrorAlert(data.message, data.message, data.params);
                            } else {
                                addErrorAlert(data);
                            }
                            break;
                        }
                        case 404:
                            addErrorAlert(i18n.t('error:url.not.found'));
                            break;
                        default:
                            if (data !== '' && data.message) {
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
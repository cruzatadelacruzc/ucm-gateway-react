import {isPromise} from "../../components/shared/util/function-utils";

const getErrorMsg = data => {
    let message = data.message;
    if (data.fieldErrors){
        data.fieldErrors.forEach(fieldErr => {
            message += `\nfield: ${fieldErr.field},  Object: ${fieldErr.objectName}, message: ${fieldErr.message}\n`;
        })
    }
    return message
}

const errorMiddleware = () => next => action => {
    // If not a promise, continue on
    if (!isPromise(action.payload)) {
        return next(action);
    }

    /**
     *
     * The error middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `catch`.
     * It need not run in production
     */
    if (process.env.NODE_ENV === 'development') {
        // Dispatch initial pending promise, but catch any errors
        return next(action).catch(error => {
            console.error(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
            if (error && error.response && error.response.data) {
                const msg = getErrorMsg(error);
                console.error(`Actual cause: ${msg}`);
            }
            return Promise.reject(error)
        })
    }
    return next(action);
}

export  default errorMiddleware;

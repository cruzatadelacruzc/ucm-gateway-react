/* eslint no-console: off */
const loggerMiddleware = () => next => action => {
    if (process.env.NODE_ENV !== 'production') {
        const { type, payload, meta } = action;
        console.groupCollapsed(type);
        console.log('Payload:', payload);
        console.log('Meta:', meta);
        console.groupEnd();
    }
    return next(action);
};

export default loggerMiddleware;

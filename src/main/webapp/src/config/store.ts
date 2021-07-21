import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, {IRootState} from "../components/shared/reducer";
import loggerMiddleware from './middlewares/logger-middleware'
import errorMiddleware from "./middlewares/error-middlaware";
import notificationMiddleware from "./middlewares/notification-middleware";

/**
 * Order to register the middleware matters.
 * Always promiseMiddleware below middlewares that needs to work with pure promise example:
 * errorMiddleware and thunkMiddleware
*/
const defaultMiddlewares = [
    thunkMiddleware,
    errorMiddleware,
    notificationMiddleware,
    promiseMiddleware,
    loggerMiddleware
];

const composedMiddlewares = middlewares =>
    process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...defaultMiddlewares, ...middlewares))
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const configureStore = (initialState? : IRootState, middlewares = []) => createStore(rootReducer, initialState, composedMiddlewares((middlewares)));

 export  default  configureStore;
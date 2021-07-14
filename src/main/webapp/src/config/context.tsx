import React, { createContext, Dispatch, useReducer, FC } from 'react';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import searchReducer, {
  initialState as searchState,
  SearchType
} from '../components/module/directory/search-result.reducer';
import authReducer, {
  AuthType,
  initialState as authState
} from '../components/shared/reducer/authenticate';
import {RootActionsType} from "../components/types";


export interface IRootStateType {
  searchResult: SearchType;
  authentication: AuthType;
}

export const InitialStateRoot = {
  searchResult: searchState,
  authentication: authState,
};

const mainReducer = (initialStateRoot: IRootStateType, action: RootActionsType) => ({
  searchResult: searchReducer(initialStateRoot.searchResult, action),
  authentication: authReducer(initialStateRoot.authentication, action),
});
const useMiddlewareReducer = createUseMiddlewareReducer([
  thunkMiddleware,
  promiseMiddleware,
  logger
]);

// A middleware has type (dispatch, getState) => nextMw => action => action
function enhanceDispatch({ getState, stateDispatch }) {
  return (...middlewares) => {
    let dispatch;
    const middlewareAPI = {
      getState,
      dispatch: action => dispatch(action)
    };
    dispatch = middlewares
        .map(m => m(middlewareAPI))
        .reduceRight((next, mw) => mw(next), stateDispatch);
    return dispatch;
  };
}

function createUseMiddlewareReducer(middlewares) {
  return (reducer, initState, initializer = s => s) => {
    const [state, setState] = React.useState(initializer(initState));
    const stateRef = React.useRef(state); // stores most recent state
    const dispatch = React.useMemo(
        () =>
            enhanceDispatch({
              getState: () => stateRef.current, // access most recent state
              stateDispatch: action => {
                stateRef.current = reducer(stateRef.current, action); // makes getState() possible
                setState(stateRef.current); // trigger re-render
                return action;
              }
            })(...middlewares),
        [reducer]
    );
    return [state, dispatch];
  }
}

function logger({ getState }) {
  return next => action => {
    console.log("state:", JSON.stringify(getState()));
    console.log("action:", JSON.stringify(action))
    return next(action);
  };
}

export const AppContext = createContext<{
  states: IRootStateType;
  dispatch: Dispatch<RootActionsType>;
}>({
  states: InitialStateRoot,
  dispatch: () => null,
});

export const AppProvider: FC = ({ children }) => {
  const [states, dispatch] = useMiddlewareReducer(mainReducer, InitialStateRoot);
  return <AppContext.Provider value={{ states, dispatch }}>{children}</AppContext.Provider>;
};

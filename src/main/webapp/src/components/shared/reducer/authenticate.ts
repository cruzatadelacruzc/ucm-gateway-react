import {ActionMap, IErrorMessage, ILogout, RootActionsType} from '../../types';
import axios from 'axios';
import {IUser} from "../models/user.model";



export enum ACTION_TYPES {
  GET_SESSION = 'authentication/GET_SESSION',
  LOGOUT = 'authentication/LOGOUT',
  CLEAR_AUTH = 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE = 'authentication/ERROR_MESSAGE',
  REQUEST = "authentication/GET_SESSION_PENDING",
  SUCCESS = "authentication/GET_SESSION_FULFILLED",
  FAILURE = "authentication/GET_SESSION_REJECTED",
}

export const initialState = {
  loading: false,
  isAuthenticated: false,
  account: {} as any,
  errorMessage: null as unknown as string, // Errors returned from server side
  redirectMessage: null as unknown as string,
  sessionHasBeenFetched: false,
  idToken: null as unknown as string,
  logoutUrl: null as unknown as string,
};

export type AuthType = Readonly<typeof initialState>;

type AuthenticatePayloadType = {
  [ACTION_TYPES.GET_SESSION]: IUser;
  [ACTION_TYPES.LOGOUT]: ILogout;
  [ACTION_TYPES.CLEAR_AUTH];
  [ACTION_TYPES.ERROR_MESSAGE]: IErrorMessage;
};

export type AuthActions = ActionMap<AuthenticatePayloadType>[keyof ActionMap<AuthenticatePayloadType>];

// Reducer
const authReducer = function (state: AuthType = initialState, action: RootActionsType): AuthType {
  switch (action.type) {
    case ACTION_TYPES.FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        errorMessage: action.payload,
      };
    case ACTION_TYPES.GET_SESSION: {
      const isAuthenticated = action.payload && action.payload.activated;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload
      };
    }
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        idToken: action.payload.idToken,
        logoutUrl: action.payload.logoutUrl,
      };
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...state,
        redirectMessage: action.payload,
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    default:
      return initialState;
  }
};

export const getSession = () => async (dispatch, getState) => {
   const { data } = await axios.get<IUser>('api/account');
  dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: data
  });

  /* const { account } = getState().authentication;
  if (account && account.langKey) {
    const langKey = Storage.session.get('locale', account.langKey);
    await dispatch(setLocale(langKey));
  } */
};

export const logout = () => async dispatch => {
  const {data} = await axios.post<ILogout>('api/logout', {})
   dispatch({
    type: ACTION_TYPES.LOGOUT,
    payload: data,
  });
}

export const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, payload: message });

export const clearAuthentication = (messageKey: string, dispatch) => {
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH,
  });
};

export default authReducer;

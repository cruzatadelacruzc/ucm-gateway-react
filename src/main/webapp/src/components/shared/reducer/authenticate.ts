import axios from 'axios';
import {IUser} from "../models/user.model";
import {FAILURE, REQUEST, SUCCESS} from "./action-type.util";
import {AnyAction} from "redux";
import i18n from '../../../config/i18n'

export interface ILogout{
  idToken: string;
  logoutUrl: string
}

export const ACTION_TYPES = {
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  account: {} as any,
  errorMessage: null as unknown as string, // Errors returned from server side
  redirectMessage: null as unknown as string,
  sessionHasBeenFetched: false,
  idToken: null as unknown as string,
  logoutUrl: null as unknown as string,
};

export type AuthStateType = Readonly<typeof initialState>;

// Reducer
const authReducer = function (state: AuthStateType = initialState, action: AnyAction): AuthStateType {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload.data
      };
    }
    case SUCCESS(ACTION_TYPES.LOGOUT):
      return {
        ...initialState,
        logoutUrl: action.payload.data.logoutUrl,
      };
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        redirectMessage: action.message,
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const getSession: () => void = () => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: axios.get<IUser>('api/account')
  });

  const {account} = getState().auth;
  if (account && account.langKey) {
    await i18n.changeLanguage(account.langKey);
    localStorage.setItem("i18nextLng", account.langKey)
  }
};

export const logout: () => void = () => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.LOGOUT,
    payload: axios.post<ILogout>('api/logout', {}),
  });
}


export const clearAuthentication = () => dispatch => {
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH,
  });
};

export default authReducer;

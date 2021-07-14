import React from 'react';
import { AxiosPromise } from 'axios';
import {SearchActions} from "../module/directory/search-result.reducer";
import {AuthActions} from "../shared/reducer/authenticate";
import {GlobalsStateType} from "../shared/reducer";

export interface IDirectoryProps {
  searchValue: string;
  handleSearchValue: (e: React.ChangeEvent<{}>) => void;
  startSearching: (event: React.FormEvent<HTMLFormElement>) => void;
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface IPayload<T> {
  type: string;
  payload: T;
}

export declare type ICrudSearchAction<T> = (
  search: string,
  dispatch: Dispatch<any>,
  from?: number,
  size?: number
) => AxiosPromise<IPayload<T>>;

export type RootActionsType = SearchActions | AuthActions | GlobalsStateType;

export interface ILogout{
    idToken: string;
    logoutUrl: string
}

export interface IErrorMessage{ message: string }

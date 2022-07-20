import {AxiosPromise} from "axios";
import * as React from "react";

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
    payload: AxiosPromise<T> | T;
    meta?: any;
}

export type IPayloadResult<T> = ((
     dispatch: any,
     getState?: any
    ) => IPayload<T> | Promise<IPayload<T>>);

export declare type ICrudSearchAction<T> = (
    search: string,
    sort?: string,
    operator?: 'AND' | 'OR',
    page?: number,
    size?: number
) => IPayload<T> | ((dispatch: any) => AxiosPromise<IPayload<T>>)

export declare type ICrudGetAllAction<T> = (
    sort?: string,
    page?: number,
    size?: number
) => IPayload<T> | ((dispatch: any) =>  AxiosPromise<IPayload<T>>);

export declare type ICrudGetAllByParamAction<T> = (
    param: string,
    page?: number,
    size?: number,
    sort?: string
) => IPayload<T> | ((dispatch: any) =>  AxiosPromise<IPayload<T>>);

export declare type ICrudGetAction<T> = (
    id: string | number,
) => IPayload<T> | ((dispatch: any) =>  AxiosPromise<IPayload<T>>);

export declare type ICrudPutAction<T> = (
    data: T
) => IPayload<T> | IPayloadResult<T>;

export declare type ICrudDeleteAction<T> = (
    id?: string | number
) => IPayload<T> | IPayloadResult<T> | null;

export interface ICustomToolbarSelectProps {
    components: { TableToolbarSelect: (props) => void }
    displayData: [{ data: Array<any>, dataIndex: number }],
    onRowsDelete: () => void,
    options: {}
    selectRowUpdate: (e, i) => void
    selectedRows: { lookup: { dataIndex: boolean }, data: Array<{ index: number, dataIndex: number }> }
}


export declare type ISearchAction<T> = (
    search: string,
    from?: number,
    size?: number
) => ((dispatch: any) => AxiosPromise<IPayload<T>>);

declare module '@mui/material/styles/createTypography' {
    interface Typography {
        subMenuCaption: React.CSSProperties,
    }
    // allow configuration using `createTheme`
    interface TypographyOptions {
        subMenuCaption?: React.CSSProperties
    }
}


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
    page?: number,
    size?: number,
    sort?: string
) => IPayload<T> | ((dispatch: any) => AxiosPromise<IPayload<T>>)

export declare type ICrudGetAllAction<T> = (
    page?: number,
    size?: number,
    sort?: string
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

export interface ITableState {
    activeColumn: null | string
    announceText: null | string
    columnOrder: Array<number>
    columns: Array<{ name: string, label?: string, options?: {} }>
    count: number
    data: Array<any>
    displayData: Array<any>
    expandedRows: { lookup: { dataIndex: boolean }, data: Array<{ index: number, dataIndex: number }> }
    filterData: Array<Array<any>>
    filterList: Array<Array<any>>
    page: number
    previousSelectedRow: null| string
    rowsPerPage: number
    rowsPerPageOptions: Array<number>
    searchProps: {}
    searchText: null | string
    selectedRows: { lookup: { dataIndex: boolean }, data: Array<{ index: number, dataIndex: number }> }
    showResponsive: boolean
    sortOrder: { name: string, direction: string }
}

declare module '@mui/material/styles/createTypography' {
    interface Typography {
        mediumAvatar:  React.CSSProperties,
        menuCaption: React.CSSProperties
        subMenuCaption: React.CSSProperties,
    }
    // allow configuration using `createTheme`
    interface TypographyOptions {
        menuCaption?: React.CSSProperties
        mediumAvatar?: React.CSSProperties,
        subMenuCaption?: React.CSSProperties
    }
}

declare module '@mui/material/styles' {
    interface Theme {
        mainContent: React.CSSProperties,
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        mainContent?: React.CSSProperties,
    }
}


import {defaultValue, IWorkPlace} from "../../../shared/models/workplace.model";
import {AnyAction} from "redux";
import {FAILURE, REQUEST, SUCCESS} from "../../../shared/reducer/action-type.util";
import {ICrudGetAction, ICrudGetAllAction, ICrudPutAction} from "../../../types";
import axios from "axios";
import {cleanEntity} from "../../../shared/util/entity-util";

export const ACTION_TYPES = {
    FETCH_WORKPLACE_FILTERED: "employee/FETCH_WORKPLACE_FILTERED",
    // UPDATE_WORKPLACE_STATUS: 'workplace/UPDATE_WORKPLACE_STATUS',
    FETCH_WORKPLACE_LIST: 'workplace/FETCH_WORKPLACE_LIST',
    FETCH_WORKPLACE: 'workplace/FETCH_WORKPLACE',
    CREATE_WORKPLACE: 'workplace/CREATE_WORKPLACE',
    UPDATE_WORKPLACE: 'workplace/UPDATE_WORKPLACE',
    DELETE_WORKPLACE: 'workplace/DELETE_WORKPLACE',
    RESET: 'workplace/RESET',
}

export const initialState = {
    loading: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<IWorkPlace>,
    entity: defaultValue,
    updating: false,
    totalItems: 0,
    updateSuccess: false,
}

export type WorkplaceStateType = Readonly<typeof initialState>;

// Reducer
const workPlaceReducer = (state: WorkplaceStateType = initialState, {type, payload}: AnyAction): WorkplaceStateType => {
    switch (type) {
        case REQUEST(ACTION_TYPES.FETCH_WORKPLACE_FILTERED):
        case REQUEST(ACTION_TYPES.FETCH_WORKPLACE_LIST):
        case REQUEST(ACTION_TYPES.FETCH_WORKPLACE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            }
        case REQUEST(ACTION_TYPES.CREATE_WORKPLACE):
        case REQUEST(ACTION_TYPES.UPDATE_WORKPLACE):
        case REQUEST(ACTION_TYPES.DELETE_WORKPLACE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            }
        case SUCCESS(ACTION_TYPES.FETCH_WORKPLACE):
            return {
                ...state,
                loading: false,
                entity: payload.data
            }
        case SUCCESS(ACTION_TYPES.FETCH_WORKPLACE_FILTERED):
        case SUCCESS(ACTION_TYPES.FETCH_WORKPLACE_LIST):
            return {
                ...state,
                loading: false,
                entities: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'],10)
            }
        case SUCCESS(ACTION_TYPES.UPDATE_WORKPLACE):
        case SUCCESS(ACTION_TYPES.CREATE_WORKPLACE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: payload.data
            }
        case SUCCESS(ACTION_TYPES.DELETE_WORKPLACE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: defaultValue
            }
        case FAILURE(ACTION_TYPES.FETCH_WORKPLACE_FILTERED):
        case FAILURE(ACTION_TYPES.FETCH_WORKPLACE_LIST):
        case FAILURE(ACTION_TYPES.CREATE_WORKPLACE):
        case FAILURE(ACTION_TYPES.UPDATE_WORKPLACE):
        case FAILURE(ACTION_TYPES.DELETE_WORKPLACE):
        case FAILURE(ACTION_TYPES.FETCH_WORKPLACE):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

// Actions
export const apiUrl = 'services/directory/api/workplaces';

export const getWorkPlaces: ICrudGetAllAction<IWorkPlace> = (page, size, sort) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_WORKPLACE_LIST,
        payload: axios.get<Array<IWorkPlace>>(`${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : '?unpaged=true'}`)
    })
}

export const getWorkPlace: ICrudGetAction<IWorkPlace> = id => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_WORKPLACE,
        payload: axios.get<IWorkPlace>(`${apiUrl}/${id}`)
    })
}

export const createWorkPlace: ICrudPutAction<IWorkPlace> = entity => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.CREATE_WORKPLACE,
        payload: axios.post<IWorkPlace>(apiUrl, cleanEntity(entity))
    })
}

export const updateWorkPlace: ICrudPutAction<IWorkPlace> = entity => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.UPDATE_WORKPLACE,
        payload: axios.put<IWorkPlace>(apiUrl, cleanEntity(entity))
    })
}

export default workPlaceReducer;
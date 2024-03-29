import {defaultValue, IWorkPlace} from "../../../shared/models/workplace.model";
import {AnyAction} from "redux";
import {FAILURE, REQUEST, SUCCESS} from "../../../shared/reducer/action-type.util";
import {
    ICrudDeleteAction,
    ICrudGetAction,
    ICrudGetAllAction,
    ICrudPutAction,
    ICrudSearchAction
} from "../../../../types";
import axios from "axios";
import {buildFormData} from "../../../shared/util/entity-util";

export const ACTION_TYPES = {
    FETCH_WORKPLACE_FILTERED: "workplace/FETCH_WORKPLACE_FILTERED",
    FETCH_WORKPLACE_LIST: 'workplace/FETCH_WORKPLACE_LIST',
    FETCH_WORKPLACE: 'workplace/FETCH_WORKPLACE',
    CREATE_WORKPLACE: 'workplace/CREATE_WORKPLACE',
    UPDATE_WORKPLACE: 'workplace/UPDATE_WORKPLACE',
    DELETE_WORKPLACE: 'workplace/DELETE_WORKPLACE',
    DELETE_AVATAR: 'workplace/DELETE_AVATAR',
    RESET: 'workplace/RESET',
}

const initialState = {
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
                entity: payload.data.employees === null ? { ...payload.data, employees: [] }: payload.data
            }
        case SUCCESS(ACTION_TYPES.DELETE_AVATAR):
            return {
                ...state,
                entity: payload.data === true ? { ...state.entity, avatarUrl: undefined}: state.entity
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
        case FAILURE(ACTION_TYPES.DELETE_AVATAR):
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

export const getWorkPlaces: ICrudGetAllAction<IWorkPlace> = (sort, page, size) => async dispatch => {
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

export const createWorkPlace: ICrudPutAction<{workplace: IWorkPlace, avatar?: File}> = data => async dispatch => {
    const formData = buildFormData(data.workplace,"workplace", data.avatar)
    return await dispatch({
        type: ACTION_TYPES.CREATE_WORKPLACE,
        payload: axios.post<IWorkPlace>(apiUrl, formData)
    })
}

export const updateWorkPlace: ICrudPutAction<{workplace: IWorkPlace, avatar?: File}> = data => async dispatch => {
    const formData = buildFormData(data.workplace,"workplace", data.avatar)
    return await dispatch({
        type: ACTION_TYPES.UPDATE_WORKPLACE,
        payload: axios.put<IWorkPlace>(apiUrl, formData)
    })
}

export const deleteWorkPlace: ICrudDeleteAction<IWorkPlace> = id => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.DELETE_WORKPLACE,
        payload: axios.delete(`${apiUrl}/${id}`)
    })
}

export const deleteAvatar: ICrudDeleteAction<IWorkPlace> = id => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.DELETE_AVATAR,
        payload: axios.delete(`${apiUrl}/avatar/${id}`)
    })
}

export const getFilteredWorkPlace: ICrudSearchAction<IWorkPlace> = (search, sort, operator = 'AND', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_WORKPLACE_FILTERED,
        payload: axios.get<Array<IWorkPlace>>(`${apiUrl}/filtered/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const reset = () => ({
    type: ACTION_TYPES.RESET
})

export default workPlaceReducer;
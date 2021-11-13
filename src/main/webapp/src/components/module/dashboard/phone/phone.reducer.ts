import axios from "axios";
import {AnyAction} from "redux";
import {ICrudSearchAction} from "../../../types";
import {defaultValue, IPhone} from "../../../shared/models/phone.model";
import {FAILURE, REQUEST, SUCCESS} from "../../../shared/reducer/action-type.util";

export const ACTION_TYPES = {
    FETCH_PHONE_FILTERED: "employee/FETCH_PHONE_FILTERED",
    FETCH_PHONE_LIST: 'phone/FETCH_PHONE_LIST',
    FETCH_PHONE: 'phone/FETCH_PHONE',
    CREATE_PHONE: 'phone/CREATE_PHONE',
    UPDATE_PHONE: 'phone/UPDATE_PHONE',
    DELETE_PHONE: 'phone/DELETE_PHONE',
    RESET: 'phone/RESET',
}

export const initialState = {
    loading: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<IPhone>,
    entity: defaultValue,
    updating: false,
    totalItems: 0,
    updateSuccess: false,
}

export type PhoneStateType = Readonly<typeof initialState>;

// Reducer
const workPlaceReducer = (state: PhoneStateType = initialState, {type, payload}: AnyAction): PhoneStateType => {
    switch (type) {
        case REQUEST(ACTION_TYPES.FETCH_PHONE_FILTERED):
        case REQUEST(ACTION_TYPES.FETCH_PHONE_LIST):
        case REQUEST(ACTION_TYPES.FETCH_PHONE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            }
        case REQUEST(ACTION_TYPES.CREATE_PHONE):
        case REQUEST(ACTION_TYPES.UPDATE_PHONE):
        case REQUEST(ACTION_TYPES.DELETE_PHONE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            }
        case SUCCESS(ACTION_TYPES.FETCH_PHONE_FILTERED):
        case SUCCESS(ACTION_TYPES.FETCH_PHONE_LIST):
            return {
                ...state,
                loading: false,
                entities: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_PHONE):
            return {
                ...state,
                loading: false,
                entity: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.CREATE_PHONE):
        case SUCCESS(ACTION_TYPES.UPDATE_PHONE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: payload.data
            }
        case SUCCESS(ACTION_TYPES.DELETE_PHONE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: defaultValue
            }
        case FAILURE(ACTION_TYPES.FETCH_PHONE_FILTERED):
        case FAILURE(ACTION_TYPES.FETCH_PHONE_LIST):
        case FAILURE(ACTION_TYPES.FETCH_PHONE):
        case FAILURE(ACTION_TYPES.UPDATE_PHONE):
        case FAILURE(ACTION_TYPES.CREATE_PHONE):
        case FAILURE(ACTION_TYPES.DELETE_PHONE):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        default:
            return state;
    }
}

//Actions
export const apiUrl = 'services/directory/api/phones';

export const getSearchPhones: ICrudSearchAction<IPhone> = (search,page, size, sort) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES,
        payload: axios.get<Array<IPhone>>(`${apiUrl}/filtered/and?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export default workPlaceReducer;
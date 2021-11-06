import {FAILURE, REQUEST, SUCCESS} from "../../../../shared/reducer/action-type.util";
import {defaultValue, IEmployee} from "../../../../shared/models/employee.model";
import {AnyAction} from "redux";
import {ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudSearchAction} from "../../../../types";
import axios from "axios";
import {cleanEntity} from "../../../../shared/util/entity-util";
import {ITEMS_PER_PAGE} from "../../../../../config/constants";


export const ACTION_TYPES =  {
    FETCH_EMPLOYEE_FILTERED: "employee/FETCH_EMPLOYEE_FILTERED",
    FETCH_EMPLOYEE_LIST : 'employee/FETCH_EMPLOYEE_LIST',
    FETCH_EMPLOYEE : 'employee/FETCH_EMPLOYEE',
    CREATE_EMPLOYEE : 'employee/CREATE_EMPLOYEE',
    UPDATE_EMPLOYEE : 'employee/UPDATE_EMPLOYEE',
    DELETE_EMPLOYEE : 'employee/DELETE_EMPLOYEE'
}

const initialState = {
    loading: true,
    errorMessage: null,
    entities: [] as ReadonlyArray<IEmployee>,
    entity: defaultValue,
    updating: false,
    totalItems: 0,
    page: 0,
    size: ITEMS_PER_PAGE,
    updateSuccess: false,
}

export type EmployeeStateType = Readonly<typeof initialState>;

// Reducer
const employeeReducer = (state: EmployeeStateType = initialState, { type, payload }: AnyAction): EmployeeStateType => {
    switch (type) {
        case REQUEST(ACTION_TYPES.FETCH_EMPLOYEE_FILTERED):
        case REQUEST(ACTION_TYPES.FETCH_EMPLOYEE_LIST):
        case REQUEST(ACTION_TYPES.FETCH_EMPLOYEE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            }
        case REQUEST(ACTION_TYPES.CREATE_EMPLOYEE):
        case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEE):
        case REQUEST(ACTION_TYPES.DELETE_EMPLOYEE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            }
        case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEE_FILTERED):
        case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEE_LIST):
            return {
                ...state,
                loading: false,
                entities: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'],10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEE):
            return {
                ...state,
                loading: false,
                entity: payload.data
            }
        case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEE):
        case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: payload.data
            }
        case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: {}
            }
        case FAILURE(ACTION_TYPES.FETCH_EMPLOYEE_FILTERED):
        case FAILURE(ACTION_TYPES.FETCH_EMPLOYEE_LIST):
        case FAILURE(ACTION_TYPES.FETCH_EMPLOYEE):
        case FAILURE(ACTION_TYPES.CREATE_EMPLOYEE):
        case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEE):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        default:
            return state
    }
}

// Actions
const apiUrl = 'services/directory/api/employees';

export const createEmployee: ICrudPutAction<IEmployee> = entity => async dispatch =>  {
    return await dispatch({
        type: ACTION_TYPES.CREATE_EMPLOYEE,
        payload: axios.post(apiUrl, cleanEntity(entity))
    })
}

export const updateEmployee: ICrudPutAction<IEmployee> = entity => async dispatch =>  {
    return await dispatch({
        type: ACTION_TYPES.UPDATE_EMPLOYEE,
        payload: axios.put(apiUrl, cleanEntity(entity))
    })
}

export const getEmployee : ICrudGetAction<IEmployee> = id => async dispatch =>  {
    return await dispatch({
        type: ACTION_TYPES.FETCH_EMPLOYEE,
        payload: axios.get(`${apiUrl}/${id}`)
    })
}

export const geEmployees: ICrudGetAllAction<IEmployee> = (page, size, sort) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_EMPLOYEE_LIST,
        payload: axios.get<Array<IEmployee>>(`${apiUrl}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilterEmployees: ICrudSearchAction<IEmployee> = (search,page, size, sort) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_EMPLOYEE_FILTERED,
        payload: axios.get<Array<IEmployee>>(`${apiUrl}/filtered/and?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export default employeeReducer;


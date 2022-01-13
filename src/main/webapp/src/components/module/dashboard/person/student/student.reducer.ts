import {AnyAction} from "redux";
import {ITEMS_PER_PAGE} from "../../../../../config/constants";
import {defaultValue, IStudent} from "../../../../shared/models/student.model";
import {FAILURE, REQUEST, SUCCESS} from "../../../../shared/reducer/action-type.util";
import {ICrudDeleteAction, ICrudGetAction, ICrudPutAction} from "../../../../types";
import axios from "axios";
import {buildFormData} from "../../../../shared/util/entity-util";


export const ACTION_TYPES =  {
    PARTIAL_UPDATE_STUDENT: 'student/PARTIAL_UPDATE_STUDENT',
    FETCH_STUDENT_FILTERED: "student/FETCH_STUDENT_FILTERED",
    FETCH_STUDENT_LIST : 'student/FETCH_STUDENT_LIST',
    FETCH_STUDENT : 'student/FETCH_STUDENT',
    CREATE_STUDENT : 'student/CREATE_STUDENT',
    UPDATE_STUDENT : 'student/UPDATE_STUDENT',
    DELETE_STUDENT : 'student/DELETE_STUDENT',
    DELETE_AVATAR : 'student/DELETE_AVATAR',
    RESET: 'student/RESET',
}

const initialState = {
    loading: true,
    errorMessage: null,
    entities: [] as ReadonlyArray<IStudent>,
    entity: defaultValue,
    updating: false,
    totalItems: 0,
    page: 0,
    size: ITEMS_PER_PAGE,
    updateSuccess: false,
}

export type StudentStateType = Readonly<typeof initialState>;

// Reducer
const studentReducer = (state: StudentStateType = initialState, { type, payload }: AnyAction): StudentStateType => {
    switch (type) {
        case REQUEST(ACTION_TYPES.FETCH_STUDENT_FILTERED):
        case REQUEST(ACTION_TYPES.FETCH_STUDENT_LIST):
        case REQUEST(ACTION_TYPES.FETCH_STUDENT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            }
        case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_STUDENT):
        case REQUEST(ACTION_TYPES.CREATE_STUDENT):
        case REQUEST(ACTION_TYPES.UPDATE_STUDENT):
        case REQUEST(ACTION_TYPES.DELETE_STUDENT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            }
        case SUCCESS(ACTION_TYPES.FETCH_STUDENT_FILTERED):
        case SUCCESS(ACTION_TYPES.FETCH_STUDENT_LIST):
            return {
                ...state,
                loading: false,
                entities: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'],10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_STUDENT):
            return {
                ...state,
                loading: false,
                entity: payload.data
            }
        case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_STUDENT):
        case SUCCESS(ACTION_TYPES.CREATE_STUDENT):
        case SUCCESS(ACTION_TYPES.UPDATE_STUDENT):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: payload.data
            }
        case SUCCESS(ACTION_TYPES.DELETE_STUDENT):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: {}
            }
        case SUCCESS(ACTION_TYPES.DELETE_AVATAR):
            return {
                ...state,
                entity: payload.data === true ? { ...state.entity, avatarUrl: undefined}: state.entity
            }
        case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_STUDENT):
        case FAILURE(ACTION_TYPES.FETCH_STUDENT_FILTERED):
        case FAILURE(ACTION_TYPES.FETCH_STUDENT_LIST):
        case FAILURE(ACTION_TYPES.FETCH_STUDENT):
        case FAILURE(ACTION_TYPES.CREATE_STUDENT):
        case FAILURE(ACTION_TYPES.UPDATE_STUDENT):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case ACTION_TYPES.RESET:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

// Actions
const apiUrl = 'services/directory/api/students';

export const getStudent: ICrudGetAction<IStudent> = id => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_STUDENT,
        payload: axios.get<IStudent>(`${apiUrl}/${id}`)
    })
}

export const createStudent: ICrudPutAction<{student: IStudent, avatar?: File}> = data => async dispatch => {
    const formData = buildFormData(data.student,"student", data.avatar)
    return await dispatch({
        type: ACTION_TYPES.CREATE_STUDENT,
        payload: axios.post<IStudent>(apiUrl, formData)
    })
}

export const updateStudent: ICrudPutAction<{student: IStudent, avatar?: File}> = data => async dispatch => {
    const formData = buildFormData(data.student,"student", data.avatar)
    return await dispatch({
        type: ACTION_TYPES.UPDATE_STUDENT,
        payload: axios.put<IStudent>(apiUrl, formData)
    })
}

export const deleteAvatar: ICrudDeleteAction<IStudent> = id => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.DELETE_AVATAR,
        payload: axios.delete<IStudent>(`${apiUrl}/avatar/${id}`)
    })
}

export const partialUpdateStudent: ICrudPutAction<{id: string, student: IStudent, avatar?: File}> = data => async dispatch => {
    const formData = buildFormData(data.student,"student", data.avatar)
    return await dispatch({
        type: ACTION_TYPES.PARTIAL_UPDATE_STUDENT,
        payload: axios.patch(`${apiUrl}/${data.id}`, formData)
    })
}

export const deleteStudent: ICrudDeleteAction<IStudent> = id => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.DELETE_STUDENT,
        payload: axios.delete(`${apiUrl}/${id}`)
    })
}

export const reset = () => ({type: ACTION_TYPES.RESET});

export default studentReducer;
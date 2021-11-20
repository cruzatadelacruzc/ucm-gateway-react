import {AnyAction} from "redux";
import {ITEMS_PER_PAGE} from "../../../../../config/constants";
import {defaultValue, IStudent} from "../../../../shared/models/student.model";
import {FAILURE, REQUEST, SUCCESS} from "../../../../shared/reducer/action-type.util";


export const ACTION_TYPES =  {
    FETCH_STUDENT_FILTERED: "student/FETCH_STUDENT_FILTERED",
    FETCH_STUDENT_LIST : 'student/FETCH_STUDENT_LIST',
    FETCH_STUDENT : 'student/FETCH_STUDENT',
    CREATE_STUDENT : 'student/CREATE_STUDENT',
    UPDATE_STUDENT : 'student/UPDATE_STUDENT',
    DELETE_STUDENT : 'student/DELETE_STUDENT'
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
        default:
            return state
    }
}

// Actions
const apiUrl = 'services/directory/api/employees';

export default studentReducer;
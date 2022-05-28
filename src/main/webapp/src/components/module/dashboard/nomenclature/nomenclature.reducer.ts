import axios from "axios";
import {AnyAction} from "redux";
import {cleanEntity} from "../../../shared/util/entity-util";
import {
    ICrudDeleteAction,
    ICrudGetAction,
    ICrudGetAllAction,
    ICrudPutAction,
    ICrudSearchAction
} from "../../../../types";
import {FAILURE, REQUEST, SUCCESS} from "../../../shared/reducer/action-type.util";
import {defaultValue, DISCRIMINATOR, INomenclature} from "../../../shared/models/nomenclature.model";

export const ACTION_TYPES = {
    FETCH_NOMENCLATURE_FILTERED: 'nomenclature/FETCH_NOMENCLATURE_FILTERED',
    FETCH_NOMENCLATURE_LIST: 'nomenclature/FETCH_NOMENCLATURE_LIST',
    FETCH_NOMENCLATURE: 'nomenclature/FETCH_NOMENCLATURE',
    CREATE_NOMENCLATURE: 'nomenclature/CREATE_NOMENCLATURE',
    UPDATE_NOMENCLATURE: 'nomenclature/UPDATE_NOMENCLATURE',
    DELETE_NOMENCLATURE: 'nomenclature/DELETE_NOMENCLATURE',
    RESET: 'nomenclature/RESET',
    FETCH_NOMENCLATURE_FILTERED_TEACHING_CATEGORIES: 'nomenclature/FETCH_NOMENCLATURE_FILTERED_TEACHING_CATEGORIES',
    FETCH_NOMENCLATURE_FILTERED_SCIENTIFIC_DEGREES: 'nomenclature/FETCH_NOMENCLATURE_FILTERED_SCIENTIFIC_DEGREES',
    FETCH_NOMENCLATURE_FILTERED_STUDY_CENTERS: 'nomenclature/FETCH_NOMENCLATURE_FILTERED_STUDY_CENTERS',
    FETCH_NOMENCLATURE_FILTERED_SPECIALTIES: 'nomenclature/FETCH_NOMENCLATURE_FILTERED_SPECIALTIES',
    FETCH_NOMENCLATURE_FILTERED_PROFESSIONS: 'nomenclature/FETCH_NOMENCLATURE_FILTERED_PROFESSIONS',
    FETCH_NOMENCLATURE_FILTERED_CATEGORIES: 'nomenclature/FETCH_NOMENCLATURE_FILTERED_CATEGORIES',
    FETCH_NOMENCLATURE_FILTERED_DISTRICTS: 'nomenclature/FETCH_NOMENCLATURE_FILTERED_DISTRICTS',
    FETCH_NOMENCLATURE_FILTERED_CHARGES: 'nomenclature/FETCH_NOMENCLATURE_FILTERED_CHARGES',
    FETCH_NOMENCLATURE_FILTERED_KINDS: 'nomenclature/FETCH_NOMENCLATURE_FILTERED_KINDS'
}

const initialState = {
    loading: false,
    loadingTeachingCategories: false,
    loadingScientificDegrees: false,
    loadingStudyCenters: false,
    loadingSpecialties: false,
    loadingProfessions: false,
    loadingCategories: false,
    loadingDistricts: false,
    loadingCharges: false,
    loadingKinds: false,
    errorMessage: null,
    teachingCategories: [] as ReadonlyArray<INomenclature>,
    scientificDegrees: [] as ReadonlyArray<INomenclature>,
    studyCenters: [] as ReadonlyArray<INomenclature>,
    specialties: [] as ReadonlyArray<INomenclature>,
    professions: [] as ReadonlyArray<INomenclature>,
    categories: [] as ReadonlyArray<INomenclature>,
    districts: [] as ReadonlyArray<INomenclature>,
    entities: [] as ReadonlyArray<INomenclature>,
    charges: [] as ReadonlyArray<INomenclature>,
    kinds: [] as ReadonlyArray<INomenclature>,
    entity: defaultValue,
    updating: false,
    totalItems: 0,
    updateSuccess: false,
}

export type NomenclatureStateType = Readonly<typeof initialState>;

// Reducer
const nomenclatureReducer = (state: NomenclatureStateType = initialState, {type, payload}: AnyAction): NomenclatureStateType => {
    switch (type) {
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_LIST):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            }
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_TEACHING_CATEGORIES):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loadingTeachingCategories: true
            }
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_STUDY_CENTERS):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loadingStudyCenters: true
            }
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SCIENTIFIC_DEGREES):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loadingScientificDegrees: true
            }
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_PROFESSIONS):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loadingProfessions: true
            }
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SPECIALTIES):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loadingSpecialties: true
            }
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CATEGORIES):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loadingCategories: true
            }
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_DISTRICTS):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loadingDistricts: true
            }
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CHARGES):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loadingCharges: true
            }
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_KINDS):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loadingKinds: true
            }
        case REQUEST(ACTION_TYPES.CREATE_NOMENCLATURE):
        case REQUEST(ACTION_TYPES.UPDATE_NOMENCLATURE):
        case REQUEST(ACTION_TYPES.DELETE_NOMENCLATURE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_PROFESSIONS):
            return {
                ...state,
                loadingProfessions: false,
                professions: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CHARGES):
            return {
                ...state,
                loadingCharges: false,
                charges: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_KINDS):
            return {
                ...state,
                loadingKinds: false,
                kinds: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_STUDY_CENTERS):
            return {
                ...state,
                loadingStudyCenters: false,
                studyCenters: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_TEACHING_CATEGORIES):
            return {
                ...state,
                loadingTeachingCategories: false,
                teachingCategories: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SCIENTIFIC_DEGREES):
            return {
                ...state,
                loadingScientificDegrees: false,
                scientificDegrees: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SPECIALTIES):
            return {
                ...state,
                loadingSpecialties: false,
                specialties: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CATEGORIES):
            return {
                ...state,
                loadingCategories: false,
                categories: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_DISTRICTS):
            return {
                ...state,
                loadingDistricts: false,
                districts: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED):
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_LIST):
            return {
                ...state,
                loading: false,
                entities: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE):
            return {
                ...state,
                loading: false,
                entity: payload.data
            }
        case SUCCESS(ACTION_TYPES.CREATE_NOMENCLATURE):
        case SUCCESS(ACTION_TYPES.UPDATE_NOMENCLATURE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: payload.data
            }
        case SUCCESS(ACTION_TYPES.DELETE_NOMENCLATURE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                entity: {}
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_LIST):
        case FAILURE(ACTION_TYPES.CREATE_NOMENCLATURE):
        case FAILURE(ACTION_TYPES.UPDATE_NOMENCLATURE):
        case FAILURE(ACTION_TYPES.DELETE_NOMENCLATURE):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_PROFESSIONS):
            return {
                ...state,
                loadingProfessions: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CHARGES):
            return {
                ...state,
                loadingCharges: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_KINDS):
            return {
                ...state,
                loadingKinds: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_STUDY_CENTERS):
            return {
                ...state,
                loadingStudyCenters: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_TEACHING_CATEGORIES):
            return {
                ...state,
                loadingTeachingCategories: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SCIENTIFIC_DEGREES):
            return {
                ...state,
                loadingScientificDegrees: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SPECIALTIES):
            return {
                ...state,
                loadingSpecialties: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CATEGORIES):
            return {
                ...state,
                loadingCategories: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_DISTRICTS):
            return {
                ...state,
                loadingDistricts: false,
                updating: false,
                updateSuccess: false,
                errorMessage: payload.data
            }
        case ACTION_TYPES.RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}

//Actions
const apiUrl = 'services/directory/api/nomenclatures';

export const createNomenclature: ICrudPutAction<INomenclature> = entity => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.CREATE_NOMENCLATURE,
        payload: axios.post(apiUrl, cleanEntity(entity))
    })
}

export const updateNomenclature: ICrudPutAction<INomenclature> = entity => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.UPDATE_NOMENCLATURE,
        payload: axios.put(apiUrl, cleanEntity(entity))
    })
}

export const getNomenclature: ICrudGetAction<INomenclature> = id => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE,
        payload: axios.get(`${apiUrl}/${id}`)
    })
}

export const getFilteredDistricts: ICrudSearchAction<INomenclature> = (search, sort, operator = 'OR', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_DISTRICTS,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${DISCRIMINATOR.DISTRICT}/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getDistricts: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_DISTRICTS,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/OR?discriminator.equals=${DISCRIMINATOR.DISTRICT}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilteredSpecialties: ICrudSearchAction<INomenclature> = (search, sort, operator = 'OR', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SPECIALTIES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${DISCRIMINATOR.SPECIALTY}/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getSpecialties: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SPECIALTIES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/OR?discriminator.equals=${DISCRIMINATOR.SPECIALTY}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilteredCategories: ICrudSearchAction<INomenclature> = (search, sort, operator = 'AND', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CATEGORIES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${DISCRIMINATOR.CATEGORY}/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getCategories: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CATEGORIES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/OR?discriminator.equals=${DISCRIMINATOR.CATEGORY}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getTeachingCategories: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_TEACHING_CATEGORIES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/OR?discriminator.equals=${DISCRIMINATOR.TEACHING_CATEGORY}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilteredTeachingCategories: ICrudSearchAction<INomenclature> = (search, sort, operator = 'AND', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_TEACHING_CATEGORIES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${DISCRIMINATOR.TEACHING_CATEGORY}/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getProfessions: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_PROFESSIONS,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/OR?discriminator.equals=${DISCRIMINATOR.PROFESSION}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilteredProfessions: ICrudSearchAction<INomenclature> = (search, sort, operator = 'AND', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_PROFESSIONS,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${DISCRIMINATOR.PROFESSION}/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getScientificDegrees: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SCIENTIFIC_DEGREES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/OR?discriminator.equals=${DISCRIMINATOR.SCIENTIFIC_DEGREE}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilteredScientificDegrees: ICrudSearchAction<INomenclature> = (search, sort, operator = 'AND', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_SCIENTIFIC_DEGREES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${DISCRIMINATOR.SCIENTIFIC_DEGREE}/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getCharges: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CHARGES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/OR?discriminator.equals=${DISCRIMINATOR.CHARGE}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilteredCharges: ICrudSearchAction<INomenclature> = (search, sort, operator = 'AND', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CHARGES,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${DISCRIMINATOR.CHARGE}/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getKinds: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_KINDS,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/OR?discriminator.equals=${DISCRIMINATOR.KIND}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilteredKinds: ICrudSearchAction<INomenclature> = (search, sort, operator = 'AND', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_KINDS,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${DISCRIMINATOR.KIND}/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getStudyCenters: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_STUDY_CENTERS,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/OR?discriminator.equals=${DISCRIMINATOR.STUDY_CENTER}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilteredStudyCenters: ICrudSearchAction<INomenclature> = (search, sort, operator = 'AND', page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_STUDY_CENTERS,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${DISCRIMINATOR.STUDY_CENTER}/${operator}?${search}&${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getNomenclatures: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_LIST,
        payload: axios.get<INomenclature>(`${apiUrl}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getFilteredNomenclatures: ICrudSearchAction<INomenclature> = (search, sort, operator = "AND", page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/${operator}?${search}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const deleteNomenclature: ICrudDeleteAction<INomenclature> = id => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.DELETE_NOMENCLATURE,
        payload: axios.delete(`${apiUrl}/${id}`)
    })
}

export const reset = () => ({
    type: ACTION_TYPES.RESET,
});

export default nomenclatureReducer;
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
    FETCH_NOMENCLATURE_TEACHING_CATEGORIES: 'nomenclature/FETCH_NOMENCLATURE_TEACHING_CATEGORIES',
    FETCH_NOMENCLATURE_SCIENTIFIC_DEGREES: 'nomenclature/FETCH_NOMENCLATURE_SCIENTIFIC_DEGREES',
    FETCH_NOMENCLATURE_STUDY_CENTERS: 'nomenclature/FETCH_NOMENCLATURE_STUDY_CENTERS',
    FETCH_NOMENCLATURE_PROFESSIONS: 'nomenclature/FETCH_NOMENCLATURE_PROFESSIONS',
    FETCH_NOMENCLATURE_CATEGORIES: 'nomenclature/FETCH_NOMENCLATURE_CATEGORIES',
    FETCH_NOMENCLATURE_KINDS: 'nomenclature/FETCH_NOMENCLATURE_KINDS',
    FETCH_NOMENCLATURE_CHARGES: 'nomenclature/FETCH_NOMENCLATURE_CHARGES',
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
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_TEACHING_CATEGORIES):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_SCIENTIFIC_DEGREES):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_STUDY_CENTERS):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_PROFESSIONS):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_CATEGORIES):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_CHARGES):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_KINDS):
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
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_PROFESSIONS):
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_PROFESSIONS):
            return {
                ...state,
                loadingProfessions: false,
                professions: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_CHARGES):
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_CHARGES):
            return {
                ...state,
                loadingCharges: false,
                charges: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_KINDS):
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_KINDS):
            return {
                ...state,
                loadingKinds: false,
                kinds: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_STUDY_CENTERS):
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_STUDY_CENTERS):
            return {
                ...state,
                loadingStudyCenters: false,
                studyCenters: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_TEACHING_CATEGORIES):
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED_TEACHING_CATEGORIES):
            return {
                ...state,
                loadingTeachingCategories: false,
                teachingCategories: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_SCIENTIFIC_DEGREES):
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
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_CATEGORIES):
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
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_TEACHING_CATEGORIES):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_SCIENTIFIC_DEGREES):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_STUDY_CENTERS):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_PROFESSIONS):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_CATEGORIES):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_CHARGES):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_KINDS):
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

export const getCategories: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_CATEGORIES,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.CATEGORY}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getTeachingCategories: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_TEACHING_CATEGORIES,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.TEACHING_CATEGORY}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getScientificDegrees: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_SCIENTIFIC_DEGREES,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.SCIENTIFIC_DEGREE}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getProfessions: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_PROFESSIONS,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.PROFESSION}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getCharges: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_CHARGES,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.CHARGE}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getKinds: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_KINDS,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.KIND}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getStudyCenters: ICrudGetAllAction<INomenclature> = (sort, page, size) => async dispatch => {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE_STUDY_CENTERS,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.STUDY_CENTER}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
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
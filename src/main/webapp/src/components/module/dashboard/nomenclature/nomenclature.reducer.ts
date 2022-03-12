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
    FETCH_NOMENCLATURE_SPECIALTIES: 'nomenclature/FETCH_NOMENCLATURE_SPECIALTIES',
    FETCH_NOMENCLATURE_PROFESSIONS: 'nomenclature/FETCH_NOMENCLATURE_PROFESSIONS',
    FETCH_NOMENCLATURE_CATEGORIES: 'nomenclature/FETCH_NOMENCLATURE_CATEGORIES',
    FETCH_NOMENCLATURE_DISTRICTS: 'nomenclature/FETCH_NOMENCLATURE_DISTRICTS',
    FETCH_NOMENCLATURE_KINDS: 'nomenclature/FETCH_NOMENCLATURE_KINDS',
    FETCH_NOMENCLATURE_CHARGES: 'nomenclature/FETCH_NOMENCLATURE_CHARGES',
    FETCH_NOMENCLATURE_FILTERED: 'nomenclature/FETCH_NOMENCLATURE_FILTERED',
    FETCH_NOMENCLATURE_LIST: 'nomenclature/FETCH_NOMENCLATURE_LIST',
    FETCH_NOMENCLATURE: 'nomenclature/FETCH_NOMENCLATURE',
    CREATE_NOMENCLATURE: 'nomenclature/CREATE_NOMENCLATURE',
    UPDATE_NOMENCLATURE: 'nomenclature/UPDATE_NOMENCLATURE',
    DELETE_NOMENCLATURE: 'nomenclature/DELETE_NOMENCLATURE',
    RESET: 'nomenclature/RESET',
}

const initialState = {
    loading: false,
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
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_SPECIALTIES):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_CATEGORIES):
        case REQUEST(ACTION_TYPES.FETCH_NOMENCLATURE_DISTRICTS):
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
            return {
                ...state,
                loading: false,
                professions: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_CHARGES):
            return {
                ...state,
                loading: false,
                charges: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_KINDS):
            return {
                ...state,
                loading: false,
                kinds: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_STUDY_CENTERS):
            return {
                ...state,
                loading: false,
                studyCenters: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_TEACHING_CATEGORIES):
            return {
                ...state,
                loading: false,
                teachingCategories: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_SCIENTIFIC_DEGREES):
            return {
                ...state,
                loading: false,
                scientificDegrees: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_SPECIALTIES):
            return {
                ...state,
                loading: false,
                specialties: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_CATEGORIES):
            return {
                ...state,
                loading: false,
                categories: payload.data,
                totalItems: parseInt(payload.headers['x-total-count'], 10)
            }
        case SUCCESS(ACTION_TYPES.FETCH_NOMENCLATURE_DISTRICTS):
            return {
                ...state,
                loading: false,
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
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_SPECIALTIES):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_CATEGORIES):
        case FAILURE(ACTION_TYPES.FETCH_NOMENCLATURE_DISTRICTS):
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

export const createNomenclature: ICrudPutAction<INomenclature> = entity => async dispatch =>  {
    return await dispatch({
        type: ACTION_TYPES.CREATE_NOMENCLATURE,
        payload: axios.post(apiUrl, cleanEntity(entity))
    })
}

export const updateNomenclature: ICrudPutAction<INomenclature> = entity => async dispatch =>  {
    return await dispatch({
        type: ACTION_TYPES.UPDATE_NOMENCLATURE,
        payload: axios.put(apiUrl, cleanEntity(entity))
    })
}

export const getNomenclature: ICrudGetAction<INomenclature> = id => async dispatch =>  {
    return await dispatch({
        type: ACTION_TYPES.FETCH_NOMENCLATURE,
        payload: axios.get(`${apiUrl}/${id}`)
    })
}

export const getDistricts: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_DISTRICTS,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.DISTRICT}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getSpecialties: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_SPECIALTIES,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.SPECIALTY}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getCategories: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_CATEGORIES,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.CATEGORY}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getTeachingCategories: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_TEACHING_CATEGORIES,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.TEACHING_CATEGORY}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getScientificDegrees: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_SCIENTIFIC_DEGREES,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.SCIENTIFIC_DEGREE}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getProfessions: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_PROFESSIONS,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.PROFESSION}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getCharges: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_CHARGES,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.CHARGE}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getKinds: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_KINDS,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.KIND}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getStudyCenters: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_STUDY_CENTERS,
        payload: axios.get<INomenclature>(`${apiUrl}/discriminator/${DISCRIMINATOR.STUDY_CENTER}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getNomenclatures: ICrudGetAllAction<INomenclature> = (page, size, sort) => async dispatch =>  {
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_LIST,
        payload: axios.get<INomenclature>(`${apiUrl}?${sort ? `page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
    })
}

export const getSearchNomenclatures: ICrudSearchAction<INomenclature> = (search,page, size, sort) => async dispatch =>  {
    const filter = `name.contains=${search}&description.contains=${search}&discriminator.contains=${search}&parentDistrictName.contains=${search}`
    return await dispatch( {
        type: ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED,
        payload: axios.get<INomenclature>(`${apiUrl}/filtered/or?${filter}&${sort ? `&page=${page}&size=${size}&sort=${sort}` : 'unpaged=true'}`)
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
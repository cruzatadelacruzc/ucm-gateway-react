import {ActionMap, ISearchAction} from '../../../types';
import {
    defaultValue as personDefaultValue,
    ISearchResultPerson,
    ISearchResultPersonHit
} from '../../shared/models/search-result-person.model';
import {
    defaultValue as workplaceDefaultValue,
    ISearchResultWorkPlace,
    ISearchResultWorkPlaceHit
} from '../../shared/models/search-result-workplace.model';
import {
    defaultValue as phoneDefaultValue,
    ISearchResultPhone,
    ISearchResultPhoneHit
} from '../../shared/models/search-result-phone.model';
import {CONFIG, INDICES} from '../../../config/constants';
import {httpES} from '../../../config/api-config';

export enum ACTION_TYPES {
    SEARCH_PERSON = 'search/PERSON',
    SEARCH_WORKPLACE = 'search/WORKPLACE',
    SEARCH_PHONE = 'search/PHONE',
    PENDING = "search/PENDING",
    FAILURE = "search/FAILURE",
    RESET = "search/RESET"
}

export const initialState = {
    loading: false,
    fromPerson: 0,
    fromWorkPlace: 0,
    fromPhone: 0,
    hasMore: false,
    resultPhone: phoneDefaultValue,
    resultPerson: personDefaultValue,
    resultWorkPlace: workplaceDefaultValue,
};

export type SearchStateType = Readonly<typeof initialState>;

type SearchPayloadType = {
    [ACTION_TYPES.RESET]: SearchStateType;
    [ACTION_TYPES.SEARCH_PHONE]: ISearchResultPhone;
    [ACTION_TYPES.SEARCH_PERSON]: ISearchResultPerson;
    [ACTION_TYPES.SEARCH_WORKPLACE]: ISearchResultWorkPlace;
    [ACTION_TYPES.FAILURE]: Pick<SearchStateType, "loading">;
    [ACTION_TYPES.PENDING]: Pick<SearchStateType, "loading">
};

export type SearchActions = ActionMap<SearchPayloadType>[keyof ActionMap<SearchPayloadType>];

// Reducer
const searchReducer = (state: SearchStateType = initialState, action: SearchActions): SearchStateType => {
    switch (action.type) {
        case ACTION_TYPES.RESET:
            return {...initialState}
        case ACTION_TYPES.PENDING: { // REQUEST
            return {
                ...state,
                loading: true,
            }
        }
        case ACTION_TYPES.SEARCH_PERSON: // SUCCESS
            const prevPersons = [...new Set([...state.resultPerson.hits.hits, ...action.payload.hits.hits])]
                .filter((personHit: ISearchResultPersonHit) => personHit._source.id)
            return {
                ...state,
                fromPhone: 0,
                loading: false,
                fromWorkPlace: 0,
                fromPerson: prevPersons.length,
                resultPhone: phoneDefaultValue,
                resultWorkPlace: workplaceDefaultValue,
                hasMore: action.payload.hits.total > prevPersons.length,
                resultPerson: {...action.payload, hits: {...action.payload.hits, hits: prevPersons}},
            };
        case ACTION_TYPES.SEARCH_WORKPLACE: // SUCCESS
            const prevWorkPlaces = [...new Set([...state.resultWorkPlace.hits.hits, ...action.payload.hits.hits])]
                .filter((workPlaceHit: ISearchResultWorkPlaceHit) => workPlaceHit._source.id)
            return {
                ...state,
                loading: false,
                fromPerson: 0,
                fromPhone: 0,
                resultPhone: phoneDefaultValue,
                resultPerson: personDefaultValue,
                fromWorkPlace: prevWorkPlaces.length,
                hasMore: action.payload.hits.total > prevWorkPlaces.length,
                resultWorkPlace: {...action.payload, hits: {...action.payload.hits, hits: prevWorkPlaces}}
            };
        case ACTION_TYPES.SEARCH_PHONE: // SUCCESS
            const prevPhones = [...new Set([...state.resultPhone.hits.hits, ...action.payload.hits.hits])]
                .filter((phone: ISearchResultPhoneHit) => phone._source.id)
            return {
                ...state,
                loading: false,
                fromPerson: 0,
                fromWorkPlace: 0,
                fromPhone: prevPhones.length,
                resultPerson: personDefaultValue,
                resultWorkPlace: workplaceDefaultValue,
                hasMore: action.payload.hits.total > prevPhones.length,
                resultPhone: {...action.payload, hits: {...action.payload.hits, hits: prevPhones}},
            };
        case ACTION_TYPES.FAILURE: // FAILURE~ERROR
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export const getSearchPerson: ISearchAction<ISearchResultPerson> = (search, from = 0, size) => async dispatch => {
    try {
        const query = CONFIG.ES_PERSON_SEARCH_TEMPLATE ? {id: CONFIG.ES_PERSON_SEARCH_TEMPLATE, params: search} : {
            from: from,
            size: size,
            query: {
                multi_match: {
                    query: search,
                    tie_breaker: 0.3,
                    fields: ["ci^1.8", "name^2", "*LastName^1.9", "email^1.8",
                        "workPlace.name^1.6", "specialty^1.6", "district^1.6",
                        "registerNumber^1.5", "professionalNumber^1.4", "charge",
                        "address", "profession^1.3", "category^1.3", "race", "gender"
                    ]
                }
            }
        }
        dispatch({type: ACTION_TYPES.PENDING})
        const {data} = await httpES.post<ISearchResultPerson>(`${INDICES.EMPLOYEES},${INDICES.STUDENTS}/_search`, query);
        return dispatch({
            type: ACTION_TYPES.SEARCH_PERSON,
            payload: data,
        });
    } catch (e) {
        dispatch({type: ACTION_TYPES.FAILURE})
    }
};

export const getSearchWorkPlace: ISearchAction<ISearchResultWorkPlace> = (search, from = 0, size) => async dispatch => {
    try {
        const query = CONFIG.ES_WORKPLACE_SEARCH_TEMPLATE ? {
            id: CONFIG.ES_WORKPLACE_SEARCH_TEMPLATE,
            params: search
        } : {
            from: from,
            size: size,
            query: {
                bool: {
                    should: [
                        {
                            multi_match: {
                                query: search,
                                tie_breaker: 0.3,
                                fields: ["name^2", "email^1.9", "employees.ci^1.7", "phones.number^1.6",
                                    "employees.name^1.7", "employees.*LastName^1.6", "employees.specialty^1.5", "employees.profession^1.4"]
                            }
                        },
                        {
                            match_phrase: {description: {query: search, boost: 1.8}}
                        }
                    ]
                }
            }
        }
        dispatch({type: ACTION_TYPES.PENDING})
        const {data} = await httpES.post<ISearchResultWorkPlace>(`${INDICES.WORKPLACES}/_search`, query);
        return dispatch({
            type: ACTION_TYPES.SEARCH_WORKPLACE,
            payload: data,
        });
    } catch (e) {
        dispatch({type: ACTION_TYPES.FAILURE})
    }
};

export const getSearchPhone: ISearchAction<ISearchResultPhone> = (search, from = 0, size) => async dispatch => {
    try {
        const query = CONFIG.ES_PHONE_SEARCH_TEMPLATE ? {id: CONFIG.ES_PHONE_SEARCH_TEMPLATE, params: search} : {
            from: from,
            size: size,
            query: {
                bool: {
                    should: [
                        {
                            multi_match: {
                                query: search,
                                tie_breaker: 0.3,
                                fields: ["number^2", "employee.ci^1.8", "employee.name^1.8", "workPlace.name^1.8",
                                    "workPlace.email^1.6", "employee.*LastName^1.7", "employee.specialty^1.5",
                                    "employee.profession^1.4", "workPlace.employees.name^1.6", "workPlace.employees.*LastName^1.6"
                                ]
                            }
                        },
                        {
                            match_phrase: {description: {query: search, boost: 1.9}}
                        }
                    ]
                }
            }
        }
        dispatch({type: ACTION_TYPES.PENDING})
        const {data} = await httpES.post<ISearchResultPhone>(`${INDICES.PHONES}/_search`, query);
        return dispatch({
            type: ACTION_TYPES.SEARCH_PHONE,
            payload: data,
        });
    } catch (e) {
        dispatch({type: ACTION_TYPES.FAILURE})
    }
};

export const reset = () => dispatch => dispatch({
    type: ACTION_TYPES.RESET,
});

export default searchReducer;

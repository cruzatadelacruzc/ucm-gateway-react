import {ActionMap, ICrudSearchAction} from '../../types';
import {defaultValue as personDefaultValue, ISearchResultPerson} from '../../shared/models/search-result-person.model';
import {
    defaultValue as workplaceDefaultValue,
    ISearchResultWorkPlace
} from '../../shared/models/search-result-workplace.model';
import {defaultValue as phoneDefaultValue, ISearchResultPhone} from '../../shared/models/search-result-phone.model';
import {CONFIG, INDICES} from '../../../config/constants';
import {httpES} from '../../../config/api-config';

export enum ACTION_TYPES {
    SEARCH_PERSON = 'search/PERSON',
    SEARCH_WORKPLACE = 'search/WORKPLACE',
    SEARCH_PHONE = 'search/PHONE',
}

export const initialState = {
    resultPerson: personDefaultValue,
    resultWorkPlace: workplaceDefaultValue,
    resultPhone: phoneDefaultValue,
};

export type SearchStateType = Readonly<typeof initialState>;

type SearchPayloadType = {
  [ACTION_TYPES.SEARCH_PERSON]: ISearchResultPerson;
  [ACTION_TYPES.SEARCH_WORKPLACE]: ISearchResultWorkPlace;
  [ACTION_TYPES.SEARCH_PHONE]: ISearchResultPhone;
};

export type SearchActions = ActionMap<SearchPayloadType>[keyof ActionMap<SearchPayloadType>];

// Reducer
const searchReducer = (state: SearchStateType = initialState, action: SearchActions): SearchStateType => {
    switch (action.type) {
        case ACTION_TYPES.SEARCH_PERSON:
            return {
                ...state,
                resultPerson: action.payload,
                resultPhone: phoneDefaultValue,
                resultWorkPlace: workplaceDefaultValue,
            };
        case ACTION_TYPES.SEARCH_WORKPLACE:
            return {
                ...state,
                resultWorkPlace: action.payload,
                resultPhone: phoneDefaultValue,
                resultPerson: personDefaultValue,
            };
        case ACTION_TYPES.SEARCH_PHONE:
            return {
                ...state,
                resultPhone: action.payload,
                resultPerson: personDefaultValue,
                resultWorkPlace: workplaceDefaultValue,
            };
        default:
            return state;
    }
};

export const getSearchPerson: ICrudSearchAction<ISearchResultPerson> = (search, from, size) => async dispatch => {
  const query = CONFIG.ES_PERSON_SEARCH_TEMPLATE ? {id: CONFIG.ES_PERSON_SEARCH_TEMPLATE, params: search} : {
        query: {
            multi_match: {
                query: search,
                tie_breaker: 0.3,
                fields: ["ci^1.8","name^2","*LastName^1.9","email^1.8",
                    "workPlace.name^1.6","specialty^1.6","district^1.6",
                    "registerNumber^1.5","professionalNumber^1.4","charge",
                    "address","profession^1.3","category^1.3"
                ]
            }
        }
    }
  const { data } = await httpES.post<ISearchResultPerson>(`${INDICES.EMPLOYEES},${INDICES.STUDENTS}/_search`, query);
  return dispatch({
    type: ACTION_TYPES.SEARCH_PERSON,
    payload: data,
  });
};

export const getSearchWorkPlace: ICrudSearchAction<ISearchResultWorkPlace> = (search, from, size) => async dispatch =>{
  const query = CONFIG.ES_WORKPLACE_SEARCH_TEMPLATE ? {id: CONFIG.ES_WORKPLACE_SEARCH_TEMPLATE, params: search} : {
      query: {
          bool: {
              should: [
                  {
                      multi_match: {
                          query: search,
                          tie_breaker: 0.3,
                          fields: ["name^2","email^1.9","employees.ci^1.7","phones.number^1.6",
                              "employees.name^1.7","employees.specialty^1.5","employees.profession^1.4"]
                      }
                  },
                  {
                      match_phrase: {description: {query: search, boost: 1.8}}
                  }
              ]
          }
      }
    }
  const { data } = await httpES.post<ISearchResultWorkPlace>(`${INDICES.WORKPLACES}/_search`, query);
  return dispatch({
    type: ACTION_TYPES.SEARCH_WORKPLACE,
    payload: data,
  });
};

export const getSearchPhone: ICrudSearchAction<ISearchResultPhone> = (search, from, size) => async dispatch => {
  const query = CONFIG.ES_PHONE_SEARCH_TEMPLATE ? {id: CONFIG.ES_PHONE_SEARCH_TEMPLATE, params: search} : {
      query: {
          bool: {
              should: [
                  {
                      multi_match: {
                          query: search,
                          tie_breaker: 0.3,
                          fields: ["number^2","employee.ci^1.8","employee.name^1.8","workPlace.name^1.8",
                              "workPlace.email^1.6","employee.*LastName^1.7","employee.specialty^1.5",
                              "employee.profession^1.4","workPlace.employees.name^1.6","workPlace.employees.*LastName^1.6"
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
  const { data } = await httpES.post<ISearchResultPhone>(`${INDICES.PHONES}/_search`, query);
  return dispatch({
    type: ACTION_TYPES.SEARCH_PHONE,
    payload: data,
  });
};

export default searchReducer;

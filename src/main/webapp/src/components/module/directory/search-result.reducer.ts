import {ActionMap, ICrudSearchAction} from '../../types';
import { ISearchResultPerson, defaultValue as personDefaultValue } from '../../shared/models/search-result-person.model';
import { ISearchResultWorkPlace, defaultValue as workplaceDefaultValue } from '../../shared/models/search-result-workplace.model';
import { ISearchResultPhone, defaultValue as phoneDefaultValue } from '../../shared/models/search-result-phone.model';
import { INDICES } from '../../../config/constants';
import { httpES } from '../../../config/api-config';

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

export const getSearchPerson: ICrudSearchAction<ISearchResultPerson> = async (search, dispatch, from, size) => {
  const { data } = await httpES.get(`${INDICES.EMPLOYEES},${INDICES.STUDENTS}/_search?q=${search}`);
  return dispatch({
    type: ACTION_TYPES.SEARCH_PERSON,
    payload: { ...personDefaultValue, took: data.took, total: data.hits?.total, max_score: data.hits?.max_score, hits: data.hits?.hits },
  });
};

export const getSearchWorkPlace: ICrudSearchAction<ISearchResultWorkPlace> = async (search, dispatch, from, size) => {
  const { data } = await httpES.get<ISearchResultWorkPlace>(`${INDICES.WORKPLACES}/_search?q=${search}`);
  return dispatch({
    type: ACTION_TYPES.SEARCH_WORKPLACE,
    payload: data,
  });
};

export const getSearchPhone: ICrudSearchAction<ISearchResultPhone> = async (search, dispatch, from, size) => {
  const { data } = await httpES.get<ISearchResultPhone>(`${INDICES.PHONES}/_search?q=${search}`);
  return dispatch({
    type: ACTION_TYPES.SEARCH_PHONE,
    payload: data,
  });
};

export default searchReducer;

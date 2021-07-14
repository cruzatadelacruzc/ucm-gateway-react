import { ISearchResultPerson } from './search-result-person.model';
import { ISearchResultPhone } from './search-result-phone.model';
export interface ISearchWorkPLaceDetails {
  _type: string;
  _score: number;
  _source: {
    id: string;
    name: string;
    email: string;
    description?: string;
    employees?: Array<ISearchResultPerson>;
    phones?: Array<ISearchResultPhone>;
  };
}
export interface ISearchResultWorkPlace {
  took: number;
  total: number;
  hits: Array<ISearchWorkPLaceDetails>;
}

export const defaultWorkPLaceDetailsValue: Readonly<ISearchWorkPLaceDetails> = {
  _type: '',
  _score: 0,
  _source: {
    id: '',
    name: '',
    email: '',
    description: '',
    employees: [],
    phones: [],
  },
};

export const defaultValue: Readonly<ISearchResultWorkPlace> = {
  took: 0,
  total: 0,
  hits: [],
};

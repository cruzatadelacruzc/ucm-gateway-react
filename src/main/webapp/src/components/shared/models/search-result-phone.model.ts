import { ISearchResultPerson, defaultValue as SearchResultPerson } from './search-result-person.model';
import { ISearchResultWorkPlace, defaultValue as SearchResultPlace } from './search-result-workplace.model';

export interface ISearchResultPhone {
  total: number;
  hits: [
    {
      _type: string;
      _score: number;
      _source: {
        id: string;
        number: number;
        description?: string;
        employee?: ISearchResultPerson;
        workPlace?: ISearchResultWorkPlace;
      };
    }
  ];
}

export const defaultValue: Readonly<ISearchResultPhone> = {
  total: 0,
  hits: [
    {
      _type: '',
      _score: 0,
      _source: {
        id: '',
        number: 0,
        description: '',
        employee: SearchResultPerson,
        workPlace: SearchResultPlace,
      },
    },
  ],
};

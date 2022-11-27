import {defaultDetailsValue as personDetails, ISearchResultPersonDetails} from './search-result-person.model';
import {defaultDetailsValue as workPlaceDetails, ISearchResultWorkPlaceDetails,} from './search-result-workplace.model';

export interface ISearchResultPhoneDetails {
  id: string;
  number: number;
  description?: string;
  employee?: ISearchResultPersonDetails;
  workPlace?: ISearchResultWorkPlaceDetails;
}

export interface ISearchResultPhoneHit {
    _index: string;
    _type: string;
    _score: number;
    _source: ISearchResultPhoneDetails
}

export interface ISearchResultPhoneHits {
    total: { value: number };
    max_score: number;
    hits: Array<ISearchResultPhoneHit>
}

export interface ISearchResultPhone {
    took: number;
    hits: ISearchResultPhoneHits
}

export const defaultDetailsValue: Readonly<ISearchResultPhoneDetails> = {
      id: '',
      number: 0,
      description: '',
      employee: personDetails,
      workPlace: workPlaceDetails,
    }

export const defaultHitValue: Readonly<ISearchResultPhoneHit> = {
    _index: '',
    _type: '',
    _score: 0,
    _source: defaultDetailsValue
}

export const defaultHitsValue: Readonly<ISearchResultPhoneHits> = {
    total: {value: 0},
    max_score: 0,
    hits: [defaultHitValue],
};

export const defaultValue: Readonly<ISearchResultPhone> = {
    took: 0,
    hits: defaultHitsValue
}

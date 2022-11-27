import {ISearchResultPersonDetails} from './search-result-person.model';
import {ISearchResultPhoneDetails} from './search-result-phone.model';

export interface ISearchResultWorkPlaceDetails {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    description?: string;
    employees?: Array<ISearchResultPersonDetails>;
    phones?: Array<ISearchResultPhoneDetails>;
}

export interface ISearchResultWorkPlaceHit {
    _index: string;
    _type: string;
    _score: number;
    _source: ISearchResultWorkPlaceDetails
}

export interface ISearchResultWorkPlaceHits {
    total: { value: number };
    max_score: 0;
    hits: Array<ISearchResultWorkPlaceHit>;
}

export interface ISearchResultWorkPlace {
    took: number;
    hits: ISearchResultWorkPlaceHits;
}

export const defaultDetailsValue: Readonly<ISearchResultWorkPlaceDetails> = {
    id: '',
    name: '',
    email: '',
    description: '',
    employees: [],
    phones: [],
}

export const defaultHitValue: Readonly<ISearchResultWorkPlaceHit> = {
    _index: '',
    _type: '',
    _score: 0,
    _source: defaultDetailsValue
}

export const defaultHitsValue: Readonly<ISearchResultWorkPlaceHits> = {
    total: {value: 0},
    max_score: 0,
    hits: [defaultHitValue],
};

export const defaultValue: Readonly<ISearchResultWorkPlace> = {
    took: 0,
    hits: defaultHitsValue,
}

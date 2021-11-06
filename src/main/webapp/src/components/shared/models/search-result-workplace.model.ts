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
    _type: string;
    _score: number;
    _source: ISearchResultWorkPlaceDetails
}

export interface ISearchResultWorkPlaceHits {
    total: number;
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
    _type: '',
    _score: 0,
    _source: defaultDetailsValue
}

export const defaultHitsValue: Readonly<ISearchResultWorkPlaceHits> = {
    total: 0,
    max_score: 0,
    hits: [defaultHitValue],
};

export const defaultValue: Readonly<ISearchResultWorkPlace> = {
    took: 0,
    hits: defaultHitsValue,
}

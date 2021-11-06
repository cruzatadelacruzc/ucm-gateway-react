import {defaultDetailsValue as workplaceDetails, ISearchResultWorkPlaceDetails} from './search-result-workplace.model';

export interface ISearchResultPersonDetails {
  id: string;
  profession?: string;
  secondLastName: string;
  specialty?: string;
  address: string;
  birthdate: string;
  charge?: string;
  gender: string;
  race: string;
  ci: string;
  bossWorkPlace: boolean;
  parentDistrict?: string;
  firstLastName: string;
  district?: string;
  name: string;
  professionalNumber?: string;
  registerNumber?: string;
  category?: string;
  email: string;
  age: number;
  workPlace?: ISearchResultWorkPlaceDetails
  classRoom?: string;
  universityYear?: number;
  residence?: string;
  kind?: string;
  studyCenter?: string;
}

export interface ISearchResultPersonHit {
  _type: string;
  _score: number;
  _source: ISearchResultPersonDetails
}

export interface ISearchResultPersonHits {
  total: number;
  max_score: number;
  hits: Array<ISearchResultPersonHit>;
}

export interface ISearchResultPerson {
    took: number;
    hits: ISearchResultPersonHits;
}

export const defaultDetailsValue: Readonly<ISearchResultPersonDetails> = {
      id: '',
      profession: '',
      secondLastName: '',
      specialty: '',
      address: '',
      birthdate: '',
      charge: '',
      gender: '',
      race: '',
      ci: '',
      bossWorkPlace: false,
      parentDistrict: '',
      firstLastName: '',
      district: '',
      name: '',
      professionalNumber: '',
      registerNumber: '',
      category: '',
      email: '',
      age: 0,
      workPlace: workplaceDetails,
      classRoom: '',
      universityYear: 1,
      residence: '',
      kind: '',
      studyCenter: '',
    }

export const defaultHitValue: Readonly<ISearchResultPersonHit> =  {
      _type: '',
      _score: 0,
      _source: defaultDetailsValue
    }

export const defaultHitsValue: Readonly<ISearchResultPersonHits> = {
  total: 0,
  max_score: 0,
  hits: [defaultHitValue],
};

export const defaultValue: Readonly<ISearchResultPerson> = {
    took: 0,
    hits: defaultHitsValue
}

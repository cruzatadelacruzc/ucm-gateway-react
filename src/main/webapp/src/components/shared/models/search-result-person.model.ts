import { ISearchWorkPLaceDetails, defaultWorkPLaceDetailsValue } from './search-result-workplace.model';

export interface ISearchPersonDetails {
  _type: string;
  _score: number;
  _source: {
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
    workPlace?: ISearchWorkPLaceDetails;
    classRoom?: string;
    universityYear?: number;
    residence?: string;
    kind?: string;
    studyCenter?: string;
  };
}

export interface ISearchResultPerson {
  took: number;
  total: number;
  max_score: number;
  hits: Array<ISearchPersonDetails>;
}

export const defaultValue: Readonly<ISearchResultPerson> = {
  took: 0,
  total: 0,
  max_score: 0,
  hits: [
    {
      _type: '',
      _score: 0,
      _source: {
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
        workPlace: defaultWorkPLaceDetailsValue,
        classRoom: '',
        universityYear: 1,
        residence: '',
        kind: '',
        studyCenter: '',
      },
    },
  ],
};

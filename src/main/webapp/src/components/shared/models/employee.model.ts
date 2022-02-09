import {defaultValue as personModel, IPerson} from "./person.model";
import {IPhone} from "./phone.model";

export interface IEmployee extends IPerson {
  startDate?: string | null
  endDate?: string | null
  salary?: number
  graduateYears?: number
  isGraduatedBySector?: boolean
  serviceYears?: number
  registerNumber?: string
  bossWorkPlace?: boolean
  professionalNumber?: string
  workPlaceId?: string
  categoryId?: string | null
  scientificDegreeId?: string | null
  teachingCategoryId?: string | null
  chargeId?: string | null
  professionId?: string | null
  phones?: Array<IPhone>,
  phoneIds?: Array<string>,
  workPlaceName?: string
  categoryName?: string
  scientificDegreeName?: string
  teachingCategoryName?: string
  chargeName?: string
  professionName?: string
}

export const defaultValue: Readonly<IEmployee> = {
  ...personModel,
  startDate: new Date().toISOString(),
  endDate: null,
  graduateYears: 0,
  isGraduatedBySector: false,
  bossWorkPlace: false,
  workPlaceId: '',
  categoryId: '',
  salary: 0,
  scientificDegreeId: '',
  teachingCategoryId: '',
  chargeId: '',
  professionId: '',
  registerNumber: '',
  serviceYears: 0,
  professionalNumber: '',
  phoneIds: [],
  phones: []
};

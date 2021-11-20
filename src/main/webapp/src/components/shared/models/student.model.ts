import {defaultValue as personModel, IPerson} from "./person.model";

export interface IStudent extends IPerson {
  kind?: string
  classRoom?: string
  residence?: string
  studyCenter?: string
  universityYear?: number
}

export const defaultValue: Readonly<IStudent> = {
  ...personModel,
  kind: '',
  classRoom: '',
  residence: '',
  studyCenter: '',
  universityYear: 1,
};

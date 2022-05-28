import {defaultValue as personModel, IPerson} from "./person.model";
import {INomenclature} from "./nomenclature.model";

export interface IStudent extends IPerson {
  kindId?: string
  kindName?: string
  classRoom?: string
  residence?: string
  studyCenterId?: string
  universityYear?: number
  studyCenterName?: string
  kind?: INomenclature | null
  studyCenter?: INomenclature | null
}

export const defaultValue: Readonly<IStudent> = {
  ...personModel,
  kindId: '',
  kind: null,
  kindName: '',
  classRoom: '',
  residence: '',
  studyCenter: null,
  studyCenterId: '',
  universityYear: 1,
  studyCenterName: ''
};

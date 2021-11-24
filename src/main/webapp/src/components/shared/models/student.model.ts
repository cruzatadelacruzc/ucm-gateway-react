import {defaultValue as personModel, IPerson} from "./person.model";

export interface IStudent extends IPerson {
  kindId?: string
  kindName?: string
  classRoom?: string
  residence?: string
  studyCenterId?: string
  universityYear?: number
  studyCenterName?: string
}

export const defaultValue: Readonly<IStudent> = {
  ...personModel,
  kindId: '',
  kindName: '',
  classRoom: '',
  residence: '',
  studyCenterId: '',
  universityYear: 1,
  studyCenterName: ''
};

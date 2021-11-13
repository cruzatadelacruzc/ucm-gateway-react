import {IWorkPlace} from "./workplace.model";
import {IEmployee} from "./employee.model";

export interface IPhone {
  id?: string;
  number: number;
  active: boolean;
  description?: string;
  workPlaceId?: string;
  employeeId?: string;
  employee?: IEmployee
  workPlace?: IWorkPlace,
}

export const defaultValue: Readonly<IPhone> = {
  number: 0,
  active: true,
  description: '',
  employeeId: '',
  workPlaceId: '',
};

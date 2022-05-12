import {IEmployee} from "./employee.model";
import {IWorkPlace} from "./workplace.model";

export interface IPhone {
  id?: string;
  number: string;
  active: boolean;
  description?: string;
  workPlaceId?: string;
  employeeId?: string;
  employeeName?: string
  workPlaceName?: string,
  employee: IEmployee | null
  workPlace: IWorkPlace | null,
}

export const defaultValue: Readonly<IPhone> = {
  number: '+53',
  active: true,
  description: '',
  employeeId: '',
  workPlaceId: '',
  employeeName:'',
  workPlaceName: '',
  employee: null,
  workPlace: null
};

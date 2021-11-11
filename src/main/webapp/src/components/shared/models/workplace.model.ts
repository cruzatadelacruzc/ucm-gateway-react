import {IEmployee} from "./employee.model";
import {IPhone} from "./phone.model";

export interface IWorkPlace {
  id?: string;
  active: boolean;
  avatarUrl?: string;
  description?: string;
  email?: string;
  employeeIds?: Array<string>;
  employees?: Array<IEmployee>;
  name: string;
  phones?: Array<IPhone>;
}

export const defaultValue: Readonly<IWorkPlace> = {
  id: '',
  name: '',
  email: '',
  active: true,
  description: '',
  employees: [],
  phones: [],
};

import {IEmployee} from "./employee.model";
import {IPhone} from "./phone.model";

export interface IWorkPlace {
  id?: string;
  name: string;
  email?: string;
  active: boolean;
  avatarUrl?: string;
  description?: string;
  phones: Array<IPhone>;
  phoneIds: Array<string>;
  employeeIds: Array<string>;
  employees: Array<IEmployee>;
}

export const defaultValue: Readonly<IWorkPlace> = {
  id: '',
  name: '',
  email: '',
  active: true,
  description: '',
  phoneIds: [],
  employeeIds: [],
  employees: [],
  phones: [],
};

export interface IWorkPlace {
  id?: string;
  active: boolean;
  description?: string;
  email?: string;
  employees?: Array<string>;
  name: string;
  phones?: Array<string>;
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

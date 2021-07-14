export interface IEmployee {
  id?: string;
  active: boolean;
  description?: string;
  email?: string;
  employees?: Array<string>;
  name: string;
  phones?: Array<string>;
}

export const defaultValue: Readonly<IEmployee> = {
  id: '',
  name: '',
  email: '',
  active: true,
  description: '',
  employees: [],
  phones: [],
};

export interface IWorkplace {
  id?: string;
  active: boolean;
  description?: string;
  email?: string;
  employees?: Array<string>;
  name: string;
  phones?: Array<string>;
}

export const defaultValue: Readonly<IWorkplace> = {
  id: '',
  name: '',
  email: '',
  active: true,
  description: '',
  employees: [],
  phones: [],
};

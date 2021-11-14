export interface IPhone {
  id?: string;
  number: string;
  active: boolean;
  description?: string;
  workPlaceId?: string;
  employeeId?: string;
  employeeName?: string
  workPlaceName?: string,
}

export const defaultValue: Readonly<IPhone> = {
  number: '+53',
  active: true,
  description: '',
  employeeId: '',
  workPlaceId: '',
  employeeName:'',
  workPlaceName: ''
};

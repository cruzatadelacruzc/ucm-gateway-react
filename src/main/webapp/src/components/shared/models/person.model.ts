import dayjs from "dayjs";

export interface IPerson {
    id?: string;
    ci?: string;
    name?: string;
    avatarUrl?: string,
    email?: string | null;
    address?: string;
    firstLastName?: string;
    secondLastName?: string;
    gender?: string;
    age?: number;
    birthdate?: string | null
    race?: string;
    districtId?: string;
    specialtyId?: string,
    districtName?: string,
    specialtyName?: string,
}

export const defaultValue: Readonly<IPerson> = {
    ci: '',
    name: '',
    email: '',
    address: '',
    avatarUrl: '',
    firstLastName: '',
    secondLastName: '',
    gender: '',
    age: 15,
    birthdate: dayjs().subtract(15, "year").toISOString(),
    race: '',
    districtId: '',
    specialtyId: ''
};

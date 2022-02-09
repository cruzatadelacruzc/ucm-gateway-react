export interface IPerson {
    id?: string;
    ci?: string;
    name?: string;
    avatarUrl?: string,
    email?: string | null;
    address?: string;
    firstLastName?: string;
    secondLastName?: string;
    gender?: string | null;
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
    birthdate: null,
    race: '',
    districtId: '',
    specialtyId: ''
};

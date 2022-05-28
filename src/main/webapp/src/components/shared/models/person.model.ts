import {INomenclature} from "./nomenclature.model";

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
    district?: INomenclature | null;
    specialty?: INomenclature | null,
    districtName?: string,
    specialtyName?: string,
}

export const defaultValue: Readonly<IPerson> = {
    ci: '',
    name: '',
    race: '',
    email: '',
    gender: null,
    address: '',
    avatarUrl: '',
    firstLastName: '',
    secondLastName: '',
    birthdate: null,
    specialtyId: '',
    districtId: '',
    specialty: null,
    district: null
};

export enum DISCRIMINATOR {
    CHARGE= "CARGO",
    CATEGORY = "CATEGORIA",
    TEACHING_CATEGORY= "CATEGORIA_DOCENTE",
    STUDY_CENTER = "CENTRO_ESTUDIO",
    DISTRICT = "DISTRITO",
    SPECIALTY = "ESPECIALIDAD",
    SCIENTIFIC_DEGREE = "GRADO_CIENTIFICO",
    PROFESSION = "PROFESION",
    KIND = "TIPO"
}
export interface INomenclature {
    id?: string;
    "name"?: string,
    "description"?: string| null,
    "parentDistrictId"?: string | null,
    "discriminator"?: DISCRIMINATOR
}

export const defaultValue: Readonly<INomenclature> = {
    discriminator: DISCRIMINATOR.CATEGORY,
    parentDistrictId: '',
    description: '',
    name: ''
}
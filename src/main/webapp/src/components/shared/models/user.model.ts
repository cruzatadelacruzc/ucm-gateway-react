export interface IUser {
    id: string,
    login: string,
    firstName:string,
    lastName:string,
    email:string,
    imageUrl?:string,
    activated:boolean,
    langKey:string,
    authorities:Array<string>
}

export const defaultValue: Readonly<IUser> = {
    id: '',
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    activated: false,
    langKey: '',
    authorities: [],
};


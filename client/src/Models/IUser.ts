export enum Role{
    Student = 0,
    Teacher = 1,
    Secretary = 2
}

export interface IUser {
    ID : number,
    email : string,
    password : string,
    role : Role,
}

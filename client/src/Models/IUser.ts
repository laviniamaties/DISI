export enum Role{
    Student = 0,
    Teacher = 1,
    Secretary = 2
}

export interface IUser {
    id?: number,
    email?: string,
    password?: string,
    role?: Role,
}

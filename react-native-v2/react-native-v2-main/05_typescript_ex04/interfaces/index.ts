export interface IUserData {
    username: string;
    phone: string;
    mail: string;
    age: Number;
    isLogged: boolean;
    isAdmin: boolean | undefined;
}

export interface IUser {
    user: IUserData;
}

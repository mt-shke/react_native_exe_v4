export interface IData {
    [inputId: string]: string;
}

export type userCivilityType = "Monsieur" | "Madama" | "Mademoiselle";

export interface IUser {
    email: string;
    password: string;
    passwordConfirmation: string;
    civility: userCivilityType | "";
    firstname: string;
    lastname: string;
    birthDate: string;
}

// SignIn Credentials

export interface ICredentials {
    email: string;
    password: string;
}

// Form

export interface IFormData {
    email: string;
    password: string;
    passwordConfirmation: string;
    civility: string;
    firstname: string;
    lastname: string;
    birthDate: string;
}

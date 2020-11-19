export interface IUser {
    username: string;
    displayName: string;
    token: string;
    image?: string;
    userDescription: string;
    userGender: string;
    birthDate: Date;
    userCity: string;
    interests: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    displayName: string;
    firstName?: string;
    lastName?: string;
    userDescription: string;
    userGender: string;
    birthDate: Date;
    userCity: string;
    interests: string;
}

export interface IAvatar {
    hair: string;
    eyebrows: string;
    clothes: string;
    eyes: string;
    mouth: string;
}
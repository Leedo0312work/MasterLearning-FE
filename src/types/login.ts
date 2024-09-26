import { IUser } from '~/models/IUser';

export interface LoginForm {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser; 
}

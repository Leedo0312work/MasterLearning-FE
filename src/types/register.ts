import { IUser } from '~/models/IUser';

export interface RegisterForm {
    email: string;
    password: string;
    password_repeat: string;
    username: string;
    date_of_birth: Date;
    role: number;
}
export interface RegisterResponse {
    data: object;
    message: string;
}

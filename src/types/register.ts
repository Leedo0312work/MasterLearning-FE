import { IUser } from '~/models/IUser';
import { JwtPayload } from 'jsonwebtoken';


export interface RegisterForm {
    name: string;
    email: string;
    avatar?: string;
    password: string;
    role: number;
    confirmPassword: string;
    date_of_birth: string;
}
export interface RegisterResponse {
    data: object;
    message: string;
}
export interface VerifyEmailRequest {
    emailVerifyToken: string;
    decodeEmailVerifyToken: JwtPayload;
}
  
export interface ResendVerifyEmailRequest {
    decodeAuthorization: JwtPayload;
}

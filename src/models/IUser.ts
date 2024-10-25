import { Role } from '~/enums/role';
import { IProfile } from '~/models/IProfile';

export declare interface IUser {
    _id: string;
    name: string;
    email: string;
    date_of_birth: Date;
    role: Role;
    verify: number;
    avatar: string;
    profile?: IProfile;
}

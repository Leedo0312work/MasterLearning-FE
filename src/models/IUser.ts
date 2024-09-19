import { IProfile } from '~/models/IProfile';

export declare interface IUser {
    _id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    profile?: IProfile;
}

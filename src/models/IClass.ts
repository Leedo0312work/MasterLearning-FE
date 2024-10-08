import { IUser } from '~/models/IUser';

export interface IClass {
    _id: string;
    name: string;
    type: string;
    description: string;
    room: string;
    topic: string;
    code: string;
    createdBy: number;
    createdByUser?: IUser;
    createdAt: string;
    updatedAt: string;
    statusClass?: number;
    teacher: [];
}

import { IUser } from '~/models/IUser';
import { TweetTypeEnum } from '~/enums/media';
import { JwtPayload } from 'jsonwebtoken';
import { Media } from '~/enums/media';


export declare interface IComment {
    _id: number;
    content: string;
    created_at: string;
    updated_at: string;
    user?: IUser[];
    decodeAuthorization: JwtPayload;
    class_id: string;
    type: TweetTypeEnum;
    parent_id: string; //  chỉ null khi tweet gốc
    medias: Media[];
}

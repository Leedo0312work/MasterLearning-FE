import { IUser } from '~/models/IUser';
import { IComment } from '~/models/IComment';
import { Media } from '~/enums/media';
import { TweetTypeEnum } from '~/enums/media';
import { JwtPayload } from 'jsonwebtoken';


export declare interface IPost {
    _id: string;
    user_id: string;
    class_id: string;
    type: TweetTypeEnum;
    content: string;
    parent_id: null; //  chỉ null khi tweet gốc
    medias: Media[];
    created_at: string;
    updated_at: string;
    user?: IUser;
    // comments: IComment[];
    decodeAuthorization: JwtPayload;
    likes: number;
    views: number;
    comment: number;
    retweet: number;
    liked: number;

}



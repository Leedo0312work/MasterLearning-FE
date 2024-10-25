export interface Media {
    url: string;
    type: MediaType; // video, image
}
export enum MediaType {
    Image,
    Video,
    VideoHLS,
    PDF
}

export enum TweetTypeEnum {
    Tweet,
    Comment
}
export interface ILesson {
    id: string;
    name: string;
    description: string;
    youtubeLink: string;
    thumbnail: string;
    createdAt: string;
    type?: number;
    viewer?: number;
    time?: string;
    media: { url: string; type: number }[];
    censored: boolean;
}

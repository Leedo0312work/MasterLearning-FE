export interface ILesson {
    id: number;
    name: string;
    description: string;
    youtubeLink: string;
    thumbnail: string;
    createdAt: string;
    type?: number;
    viewer?: number;
    time?: string;
}

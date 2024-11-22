interface IMedia {
    url: string;
    type: number;
}

export interface ILesson {
    id: string;
    name: string;
    description: string;
    type?: number;
    media: IMedia[];
    censored?: boolean;
    deleted_At?: any;
    created_at?: any;
    updated_at?: any;
    teacher_id?: string;
    class_id?: string;
}

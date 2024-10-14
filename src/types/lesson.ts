import { ILesson } from '~/models/ILesson';

export type FormLessonType = Pick<ILesson, 'name' | 'description' | 'id'> & {
    class_id: string;
    type: number;
    media: {
        type: number; // 0: Image, 2: Video, 3: VideoHLS
        url: string;
    };
};

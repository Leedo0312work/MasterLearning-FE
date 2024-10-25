import { FormLessonType } from '~/types/lesson';
import API from '~/network/API';

export const fetchCreateLesson = (data: FormLessonType) => {
    return API.post('/lessons/create', data);
};

// export const fetchGetLessonByClass = (classId: number) => {
//     return API.get(`/lessons/getByClassId`, {
//         params: {
//             classId,
//         },
//     });
// };

export const fetchGetLessonByClass = (classId: string) => {
    return API.post(`/lessons/getByClassId`, {
        class_id: classId,
    });
};

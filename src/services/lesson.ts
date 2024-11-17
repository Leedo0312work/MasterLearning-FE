import { FormLessonType } from '~/types/lesson';
import API from '~/network/API';

export const fetchCreateLesson = (data: FormLessonType) => {
    return API.post('/lessons/create', data);
};

export const fetchGetLessonByClass = (classId: string) => {
    return API.post(`/lessons/getByClassId`, {
        class_id: classId,
    });
};

export const fetchGetLessonById = (id: string) => {
    return API.get(`/lessons/${id}`);
};

export const fetchUpdateLesson = (id: string, data: Partial<FormLessonType>) => {
    return API.put('/lessons/update', { id, ...data });
};

export const fetchDeleteLesson = (id: string) => {
    return API.delete('/lessons/delete', {
        data: { id },
    });
};

export const fetchNotCensoredLessons = (type: number) => {
    return API.get('/lessons/not-censored', {
        data: { type },
    });
};

export const fetchCensorLesson = (lessonId: string) => {
    return API.post('/lessons/censor', { lesson_id: lessonId });
};

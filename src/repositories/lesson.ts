import { FormLessonType } from '~/types/lesson';
import { ResponseAPI } from '~/app/response';
import { fetchCreateLesson, fetchGetLessonByClass } from '~/services/lesson';
import { ILesson } from '~/models/ILesson';
import API from '~/network/API';

export const getCreateLesson = async (data: FormLessonType): Promise<ResponseAPI> => {
    const response = await fetchCreateLesson(data);
    return response.data;
};

export const getLessonByClassId = async (classId: number): Promise<ILesson[]> => {
    const response = await fetchGetLessonByClass(classId);
    return response.data.data;
};

export const getLessonById = async (id: number): Promise<ILesson> => {
    const response = await API.get(`/lessons/${id}`);
    return response.data.data;
};

export const getUpdateLesson = async (id: number, data: FormLessonType): Promise<ResponseAPI> => {
    const response = await API.put(`/lessons/update/${id}`, data);
    return response.data;
};

export const getDeleteLesson = async (id: number): Promise<ResponseAPI> => {
    const response = await API.put(`/lessons/delete/${id}`);
    return response.data;
};

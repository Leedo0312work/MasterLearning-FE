import { FormLessonType } from '~/types/lesson';
import { ResponseAPI } from '~/app/response';
import { fetchCreateLesson, fetchGetLessonByClass } from '~/services/lesson';
import { ILesson } from '~/models/ILesson';
import API from '~/network/API';

export const getCreateLesson = async (data: FormLessonType): Promise<ResponseAPI> => {
    const response = await fetchCreateLesson(data);
    return response.data;
};

export const getLessonByClassId = async (classId: string): Promise<ILesson[]> => {
    try {
        const response = await fetchGetLessonByClass(classId);

        console.log('API response:', response);

        if (response?.data?.result) {
            return response.data.result;
        } else {
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error fetching lessons by class ID:', error);
        throw error;
    }
};

export const getLessonById = async (id: string): Promise<any> => {
    if (!id) return null;
    const response = await API.get(`/lessons/${id}`);
    return response.data;
};

export const updateLesson = async (id: string, data: Partial<FormLessonType>): Promise<ResponseAPI> => {
    try {
        const response = await API.put('/lessons/update', {
            id, 
            ...data 
        });
        return response.data;
    } catch (error) {
        console.error('Error updating lesson:', error);
        throw error;
    }
};

export const deleteLesson = async (id: string): Promise<ResponseAPI> => {
    try {
        const response = await API.delete('/lessons/delete', {
            data: { id } 
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting lesson:', error);
        throw error;
    }
};
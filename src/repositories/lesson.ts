import { FormLessonType } from '~/types/lesson';
import { ResponseAPI } from '~/app/response';
import {
    fetchCensorLesson,
    fetchCreateLesson,
    fetchDeleteLesson,
    fetchGetLessonByClass,
    fetchGetLessonById,
    fetchNotCensoredLessons,
    fetchRejectCensorLesson,
    fetchUpdateLesson,
} from '~/services/lesson';
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
    const response = await fetchGetLessonById(id);
    return response.data;
};

export const updateLesson = async (
    id: string,
    data: Partial<FormLessonType>,
): Promise<ResponseAPI> => {
    try {
        const response = await fetchUpdateLesson(id, data);
        return response.data;
    } catch (error) {
        console.error('Error updating lesson:', error);
        throw error;
    }
};

export const deleteLesson = async (id: string): Promise<ResponseAPI> => {
    try {
        const response = await fetchDeleteLesson(id);
        return response.data;
    } catch (error) {
        console.error('Error deleting lesson:', error);
        throw error;
    }
};

export const getNotCensoredLessons = async (type: number, isAll: boolean): Promise<ILesson[]> => {
    try {
        const response = await fetchNotCensoredLessons(type, isAll);

        console.log('response: ', response);
        if (response?.data?.result) {
            return response.data.result;
        } else {
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error fetching not censored lessons:', error);
        throw error;
    }
};

export const censorLesson = async (lessonId: string): Promise<void> => {
    try {
        const response = await fetchCensorLesson(lessonId);
        console.log('response: ', response);
        if (response?.status === 200) {
            console.log('Lesson censored successfully');
        } else {
            throw new Error('Failed to censor lesson');
        }
    } catch (error) {
        console.error('Error censoring lesson:', error);
        throw error;
    }
};

export const rejectCensorLesson = async (lessonId: string): Promise<void> => {
    try {
        const response = await fetchRejectCensorLesson(lessonId);
        console.log('response: ', response);
        if (response?.status === 200) {
            console.log('Lesson censor rejected successfully');
        } else {
            throw new Error('Failed to censor lesson');
        }
    } catch (error) {
        console.error('Error censoring lesson:', error);
        throw error;
    }
};

import { FormMultipleChoiceInterface, ISubmit, ISubmitScore } from '~/types/exercise';
import API from '~/network/API';
import { identity } from 'lodash';
import { SearchMark } from '~/models/IExercise';

export const fetchCreateMultipleChoiceExercise = (data: FormMultipleChoiceInterface) => {
    return API.post('/excirses/create', data);
};

export const fetchExercisesByClass = (classId: number) => {
    return API.get('/v1/exercises', {
        params: {
            classId,
        },
    });
};

//thêm
export const fetchListExercisesStudent = (classId: number) => {
    return API.get(`excirses/list-for-student/${classId}`);
};

export const fetchListExercisesTeacher = (classId: number) => {
    return API.get(`excirses/list-for-teacher/${classId}`);
};

export const fetchListNotMarkExercisesByTeacher = (execireId: number) => {
    return API.get(`excirses/list-not-mark/${execireId}`);
};
export const fetchMarkExercisesByTeacher = (execireId: string, searchField?: SearchMark) => {
    const params = new URLSearchParams();
    if (searchField) {
        Object.entries(searchField).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });
    }

    // Gửi request với query string
    return API.get(`excirses/get-mark-execire-for-teacher/${execireId}?${params.toString()}`);
};
export const fetchMarkExercisesByStudent = (execireId: string) => {
    return API.get(`excirses/get-mark-execire-for-student/${execireId}`);
};
export const fetchListNotMarkExercisesDetailByTeacher = (execireId: string) => {
    return API.get(`excirses/detail-to-mark/${execireId}`);
};
export const fetchExercisesStudent = (exerciseId: string) => {
    return API.get(`excirses/for-student/${exerciseId}`);
};

export const fetchExercisesTeacher = (exerciseId: string) => {
    return API.get(`excirses/for-teacher/${exerciseId}`);
};

//

export const fetchMultipleChoiceExerciseDetail = (id: number) => {
    return API.get(`/v1/exercises/multiple-choice/${id}/edit`);
};
export const fetchDeleteMultipleChoice = (id: any) => {
    return API.post(`/excirses/delete`, id);
};

export const fetchUpdateMultipleChoice = (data: FormMultipleChoiceInterface) => {
    return API.put(`/excirses/update`, data);
};
export const fetchSubmitExecireByStudent = (data: ISubmit) => {
    return API.post(`/excirses/submit`, data);
};
export const fetchScoreExecireByTeacher = (data: ISubmitScore) => {
    return API.post(`/excirses/mark`, data);
};

import { FormMultipleChoiceInterface } from '~/types/exercise';
import API from '~/network/API';

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

export const fetchUpdateMultipleChoice = (id: number, data: FormMultipleChoiceInterface) => {
    return API.put(`/v1/exercises/multiple-choice/${id}`, data);
};

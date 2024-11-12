import {
    fetchCreateMultipleChoiceExercise,
    fetchExercisesByClass,
    fetchExercisesStudent,
    fetchExercisesTeacher,
    fetchListExercisesStudent,
    fetchListExercisesTeacher,
    fetchMultipleChoiceExerciseDetail,
    fetchUpdateMultipleChoice,
    fetchDeleteMultipleChoice
} from '~/services/exercise';
import { FormMultipleChoiceInterface } from '~/types/exercise';
import { ResponseAPI } from '~/app/response';
import { IExercise } from '~/models/IExercise';

export const getCreateMultipleChoice = async (data: FormMultipleChoiceInterface): Promise<ResponseAPI> => {
    const response = await fetchCreateMultipleChoiceExercise(data);
    return response.data;
};

export const getExercisesByClass = async (classId: number): Promise<IExercise[]> => {
    const response = await fetchExercisesByClass(classId);
    return response.data.data;
};

//Thêm
export const getListExercisesStudent = async (classId: number): Promise<IExercise[]> => {
    const response = await fetchListExercisesStudent(classId);
    return response.data.result;
};

export const getListExercisesTeacher = async (classId: number): Promise<IExercise[]> => {
    const response = await fetchListExercisesTeacher(classId);
    return response.data.result;
};


export const getExercisesStudent = async (exerciseId: string): Promise<IExercise[]> => {
    const response = await fetchExercisesStudent(exerciseId);
    return response.data.result;
};

export const getExercisesTeacher = async (exerciseId: string): Promise<IExercise[]> => {
    const response = await fetchExercisesTeacher(exerciseId);
    console.log("Response từ API:", response);
    return response.data.result;
};

//



export const getMultipleChoiceExerciseDetail = async (exerciseId: number): Promise<FormMultipleChoiceInterface> => {
    const response = await fetchMultipleChoiceExerciseDetail(exerciseId);
    const data = response.data.data;
    return {
        ...data,
        isTest: data?.isTest === 1 ? true : false,
        preventViewQuestion: data?.preventViewQuestion === 1 ? true : false,
    };
};

export const getUpdateMultipleChoice = async (data: FormMultipleChoiceInterface): Promise<ResponseAPI> => {
    const response = await fetchUpdateMultipleChoice(data);
    return response.data;
};
export const getDeleteMultipleChoice = async (_id: string): Promise<IExercise[]> => {
    const response = await fetchDeleteMultipleChoice(_id);
    return response.data;
};

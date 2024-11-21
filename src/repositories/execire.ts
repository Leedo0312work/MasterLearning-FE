import { fetchSubmitMultipleChoice } from '~/services/assignment';
import {
    fetchExercisesStudent,
    fetchListNotMarkExercisesDetailByTeacher,
} from '~/services/exercise';

export const getExecireDetail = async (id: string) => {
    const response = await fetchExercisesStudent(id);
    return response.data;
};
export const getExecireDetailItem = async (id: string) => {
    const response = await fetchListNotMarkExercisesDetailByTeacher(id);
    return response.data;
};

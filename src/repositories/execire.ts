import { fetchSubmitMultipleChoice } from '~/services/assignment';
import { fetchExercisesStudent } from '~/services/exercise';

export const getExecireDetail = async (id: string) => {
    const response = await fetchExercisesStudent(id);
    return response.data;
};

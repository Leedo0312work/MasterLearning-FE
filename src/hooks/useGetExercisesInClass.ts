import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IExercise } from '~/models/IExercise';
import { getExercisesByClass, getListExercisesStudent } from '~/repositories/exercise';
import useExercisesInClassStore from '~/store/useExercisesInClassStore';

export default function useGetExerciseInClass() {
    const { id } = useParams();

    const setId = useExercisesInClassStore((state) => state.setId);

    return useQuery<IExercise[]>(['exercises', id], () => getListExercisesStudent(Number(id)), {
        onSuccess(data) {
            setId(data[0]._id);
        },
    });
}

import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ExercisesInClassStore {
    _id: string | null | undefined;
    setId: (id: string) => void;
}

const useExercisesInClass = create<ExercisesInClassStore>()(
    devtools(
        immer((set, get) => ({
            _id: null,
            setId: (_id: string) => {
                set((state) => {
                    state._id = _id;
                });
            },
        })),
    ),
);

export default useExercisesInClass;

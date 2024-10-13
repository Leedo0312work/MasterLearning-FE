import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ILesson } from '~/models/ILesson'; // Assuming you have an ILesson model

interface LessonStore {
    id: number | null;
    lessons: ILesson[];
    setId: (id: number) => void;
    setLessons: (lessons: ILesson[]) => void;
}

const useLessonStore = create<LessonStore>()(
    devtools(
        immer((set) => ({
            id: null,
            lessons: [],
            setId: (id: number) => {
                set((state) => {
                    state.id = id;
                });
            },
            setLessons: (lessons: ILesson[]) => {
                set((state) => {
                    state.lessons = lessons;
                });
            },
        })),
    ),
);

export default useLessonStore;

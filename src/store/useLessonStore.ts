import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ILesson } from '~/models/ILesson';

interface LessonStore {
    id: number | null; // ID của lớp học
    lessons: ILesson[]; // Danh sách các bài giảng
    selectedLessonId: number | null; // ID bài giảng đã chọn
    setId: (id: number) => void; // Đặt ID của lớp học
    setLessons: (lessons: ILesson[]) => void; // Đặt danh sách bài giảng
    setSelectedLessonId: (id: any) => void; // Đặt ID bài giảng đã chọn
}

const useLessonStore = create<LessonStore>()(
    devtools(
        immer((set) => ({
            id: null,
            lessons: [],
            selectedLessonId: null, // Khởi tạo selectedLessonId với giá trị null
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
            setSelectedLessonId: (id: number) => {
                set((state) => {
                    state.selectedLessonId = id; // Cập nhật selectedLessonId khi chọn bài giảng
                });
            },
        })),
    ),
);

export default useLessonStore;

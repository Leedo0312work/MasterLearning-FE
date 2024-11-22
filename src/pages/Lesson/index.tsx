import SidebarLeftLesson from '~/components/SidebarLeftLesson';
import LesssonContent from '~/components/LesssonContent';
import SiderbarRightLesson from '~/components/SiderbarRightLesson';
import LessonHeader from '~/components/LessonHeader';
import useModal from '~/hooks/useModal';
import ModalAddFolder from '~/components/ModalAddFolder';

import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getLessonByClassId } from '~/repositories/lesson';
import useLessonStore from '~/store/useLessonStore';

function Lesson() {
    const { id: classId, type } = useParams();
    const { lessons, setLessons } = useLessonStore((state) => state); // lấy `lessons` từ `useLessonStore`
    const queryClient = useQueryClient();

    const {
        data: fetchedLessons,
        isLoading,
        isError,
    } = useQuery(['lessons', classId], () => getLessonByClassId(classId as string), {
        onSuccess: (data) => {
            setLessons(data);
        },
        onError: (error) => {
            console.error('Error fetching lessons:', error);
        },
    });

    const handleDeleteSuccess = (deletedLessonId: any) => {
        const updatedLessons = lessons.filter((lesson) => lesson.id !== deletedLessonId);
        setLessons(updatedLessons);
        queryClient.invalidateQueries(['lessons', classId]);
    };

    if (isLoading) {
        return <div>Loading lessons...</div>;
    }

    if (isError) {
        return <div>Error fetching lessons.</div>;
    }

    const filteredLessons = lessons?.filter((lesson) => lesson.type === parseInt(type ?? '0', 10));

    return (
        <div className={styles.wrap}>
            <LessonHeader name={type === '0' ? 'Tài liệu' : 'Bài giảng'} />
            <div className={styles.content}>
                <LesssonContent lessons={filteredLessons} onDeleteSuccess={handleDeleteSuccess} />
                {type === '1' && <SiderbarRightLesson onDeleteSuccess={handleDeleteSuccess} />}
            </div>
        </div>
    );
}

export default Lesson;

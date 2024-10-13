import SidebarLeftLesson from '~/components/SidebarLeftLesson';
import LesssonContent from '~/components/LesssonContent';
import SiderbarRightLesson from '~/components/SiderbarRightLesson';
import LessonHeader from '~/components/LessonHeader';
import useModal from '~/hooks/useModal';
import ModalAddFolder from '~/components/ModalAddFolder';

import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getLessonByClassId } from '~/repositories/lesson';
import useLessonStore from '~/store/useLessonStore';

const defaultData = [
    {
        video: 10,
        name: 'Sinh',
        viewer: 2,
        time: '28 tháng 7 lúc 14:44',
    },
];
function Lesson() {
    const { id: classId } = useParams();
    const { setLessons } = useLessonStore((state) => state);

    console.log('Class ID from URL:', classId);

    const {
        data: lessons,
        isLoading,
        isError,
    } = useQuery(['lessons', classId], () => getLessonByClassId(classId as string), {
        onSuccess: (data) => {
            console.log('Fetched lessons:', data);
            setLessons(data);
        },
        onError: (error) => {
            console.error('Error fetching lessons:', error);
        },
    });

    if (isLoading) {
        return <div>Loading lessons...</div>;
    }

    if (isError) {
        return <div>Error fetching lessons.</div>;
    }

    console.log('lessons fetch from classID: ', lessons);

    return (
        <div className={styles.wrap}>
            <LessonHeader name="Bài giảng" />
            <div className={styles.content}>
                <LesssonContent />
                <SiderbarRightLesson />
            </div>
        </div>
    );
}

export default Lesson;

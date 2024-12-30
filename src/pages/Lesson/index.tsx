import LesssonContent from '~/components/LesssonContent';
import SiderbarRightLesson from '~/components/SiderbarRightLesson';
import LessonHeader from '~/components/LessonHeader';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getLessonByClassId } from '~/repositories/lesson';
import useLessonStore from '~/store/useLessonStore';
import { isNull } from 'lodash';
import useAuthStore from '~/store/useAuthStore';
import { Spin } from 'antd';

function Lesson() {
    const { id: classId, type } = useParams();
    const { lessons, setLessons } = useLessonStore((state) => state);
    const queryClient = useQueryClient();
    4;
    const { user } = useAuthStore((state) => state);

    const { data, isLoading, isError } = useQuery(
        ['lessons', classId],
        () => getLessonByClassId(classId as string),
        {
            onSuccess: (data) => {
                setLessons(data);
            },
            onError: (error) => {
                console.error('Error fetching lessons:', error);
            },
        },
    );

    const handleDeleteSuccess = (deletedLessonId: any) => {
        const updatedLessons = lessons.filter((lesson) => lesson.id !== deletedLessonId);
        setLessons(updatedLessons);
        queryClient.invalidateQueries(['lessons', classId]);
    };

    if (isLoading) {
        return (
            <div className={styles.wrap}>
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    if (isError) {
        return <div>Error fetching lessons.</div>;
    }

    // const filteredLessons = lessons?.filter((lesson) => lesson.type === parseInt(type ?? '0', 10));
    const filteredLessons = lessons?.filter((lesson) => {
        const isTypeMatch = lesson.type === parseInt(type ?? '0', 10); // Filter by lesson type
        const isRoleMatch =
            user?.role === 1
                ? lesson.censored === true // For students, show only censored lessons
                : user?.role === 2; // For teachers, show all lessons

        return isTypeMatch && isRoleMatch; // Both conditions must match
    });
    console.log('filteredLessons: ', filteredLessons);

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

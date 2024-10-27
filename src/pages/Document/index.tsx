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
import DocumentContent from '~/components/Document/DocumentContent';
import DocumentHeader from '~/components/Document/DocumentHeader';
import SiderbarRightDocument from '~/components/Document/SiderbarRightDocument';

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
            console.log('Fetched lessons/document:', data);
            setLessons(data);
        },
        onError: (error) => {
            console.error('Error fetching lessons/document:', error);
        },
    });

    if (isLoading) {
        return <div>Loading document lessons...</div>;
    }

    if (isError || !lessons || lessons.length === 0) {
        return <div>Error fetching document lessons.</div>;
    }

    console.log('lessons fetch from classID: ', lessons);

    const documentLessons = lessons?.filter((lesson) => lesson.type === 0);

    return (
        <div className={styles.wrap}>
            {documentLessons.length > 0 ? (
                documentLessons.map((document) => (
                    <div key={document.id}>
                        <DocumentHeader name={document.name || 'Tài liệu'} />
                        <div className={styles.content}>
                            <DocumentContent />
                            <SiderbarRightDocument />
                        </div>
                    </div>
                ))
            ) : (
                <div>No document lessons available.</div>
            )}
        </div>
    );
}

export default Lesson;

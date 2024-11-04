import LesssonContentHeader from '~/components/LesssonContentHeader';
import CardVideo from '~/components/CardVideo';

import styles from './styles.module.css';
import useFolderStore from '~/store/useFolderStore';
import { useQuery } from 'react-query';
import { getLessonByClassId } from '~/repositories/lesson';
import useLessonStore from '~/store/useLessonStore';
import CardDocument from '../CardDocument';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function LesssonContent({ lessons }: any) {
    // const { id: lessonId, setId } = useLessonStore((state) => state);
    const [lessonList, setLessonList] = useState(lessons);
    const { id: classId, lessonId, type } = useParams();
    const navigate = useNavigate();
    const handleDeleteSuccess = (deletedId: number) => {
        setLessonList(lessonList.filter((lesson: any) => lesson.id !== deletedId));
    };

    console.log('classId: ', classId);

    return (
        <div className={styles.wrap}>
            <LesssonContentHeader />
            <div className={styles.list_card}>
                {lessons && lessons.length > 0 ? (
                    lessons.map((item: any) =>
                        item.type === 1 ? (
                            <CardVideo
                                id={item._id}
                                //  active={item.id === lessonId}
                                onClick={() => {
                                    navigate(`/class/${classId}/content/1/view/${item._id}`);
                                }}
                                key={item._id}
                                name={item.name}
                                video={item.media.url}
                                viewer={item.viewer}
                                time={item.time}
                                createdAt={item.created_at}
                                thumbnail={item.thumbnail}
                            />
                        ) : (
                            <CardDocument
                                lessonId={item._id}
                                //  active={item.id === lessonId}
                                classId={classId}
                                key={item._id}
                                name={item.name}
                                viewer={item.viewer}
                                media={item.media}
                                createdAt={item.created_at}
                                thumbnail={item.thumbnail || 'default-thumbnail-url'}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                        ),
                    )
                ) : (
                    <div className={styles.noContent}>Lớp học chưa có nội dung nào</div>
                )}
            </div>
        </div>
    );
}

export default LesssonContent;

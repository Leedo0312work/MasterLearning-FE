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
{
    /* <CardVideo
                                id={item?.id}
                                active={item?.id === lessonId}
                                onClick={(id: any) => setId(Number(id))}
                                key={item?.name}
                                name={item?.name}
                                video={item?.video}
                                viewer={item?.viewer}
                                time={item?.time}
                                createdAt={item?.createdAt}
                                thumbnail={item?.thumbnail}
                            /> */
}

function LesssonContent({ lessons }: any) {
    const { id: lessonId, setId } = useLessonStore((state) => state);
    const [lessonList, setLessonList] = useState(lessons);
    const { id: classId } = useParams();
    const navigate = useNavigate();
    const handleDeleteSuccess = (deletedId: number) => {
        setLessonList(lessonList.filter((lesson: any) => lesson.id !== deletedId));
    };

    console.log('lesson: ', lessons);

    return (
        <div className={styles.wrap}>
            <LesssonContentHeader />
            <div className={styles.list_card}>
                {lessons && lessons.length > 0 ? (
                    lessons.map((item: any) =>
                        item.type === 1 ? (
                            <CardVideo
                                id={item._id}
                                active={item.id === lessonId}
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
                                id={item._id}
                                active={item.id === lessonId}
                                onClick={(id: any) =>
                                    navigate(`/class/${classId}/content/0/view/${item._id}`)
                                }
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

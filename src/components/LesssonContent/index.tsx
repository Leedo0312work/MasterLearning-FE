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


    function LesssonContent({ lessons, onDeleteSuccess }: any) {
        const { id: classId } = useParams();
        const navigate = useNavigate();

        const { selectedLessonId, setSelectedLessonId } = useLessonStore((state) => ({
            selectedLessonId: state.selectedLessonId,
            setSelectedLessonId: state.setSelectedLessonId
        }));

        const handleSelectLesson = (lessonId: string) => {
            setSelectedLessonId(lessonId);
        };

        console.log('lessons data', lessons);
        

        return (
            <div className={styles.wrap}>
                <LesssonContentHeader />
                <div className={styles.list_card}>
                    {lessons && lessons.length > 0 ? (
                        lessons.map((item: any) =>
                            item.type === 1 ? (
                                <CardVideo
                                    id={item._id}
                                    onClick={() => handleSelectLesson(item._id)}
                                    active={selectedLessonId === item._id}
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
                                    onClick={() => handleSelectLesson(item._id)}
                                    classId={classId}
                                    key={item._id}
                                    name={item.name}
                                    viewer={item.viewer}
                                    media={item.media}
                                    createdAt={item.created_at}
                                    thumbnail={item.thumbnail || 'default-thumbnail-url'}
                                    onDeleteSuccess={onDeleteSuccess}
                                    
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

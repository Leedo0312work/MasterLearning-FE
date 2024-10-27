import LesssonContentHeader from '~/components/LesssonContentHeader';
import CardVideo from '~/components/CardVideo';

import styles from './styles.module.css';
import useFolderStore from '~/store/useFolderStore';
import { useQuery } from 'react-query';
import { getLessonByClassId } from '~/repositories/lesson';
import useLessonStore from '~/store/useLessonStore';
import CardDocument from '../CardDocument';

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

function LesssonContent() {
    const { lessons, id: lessonId, setId } = useLessonStore((state) => state);

    return (
        <div className={styles.wrap}>
            <LesssonContentHeader />
            <div className={styles.list_card}>
                {lessons && lessons.length > 0 ? (
                    lessons.map((item: any) =>
                        item.type === 1 ? (
                            <CardVideo
                                id={item.id}
                                active={item.id === lessonId}
                                onClick={(id: any) => setId(Number(id))}
                                key={item.id}
                                name={item.name}
                                video={item.media.url}
                                viewer={item.viewer}
                                time={item.time}
                                createdAt={item.createdAt}
                                thumbnail={item.thumbnail}
                            />
                        ) : (
                            <CardDocument
                                id={item.id}
                                active={item.id === lessonId}
                                onClick={(id: any) => setId(Number(id))}
                                key={item.id}
                                name={item.name}
                                viewer={item.viewer}
                                createdAt={item.createdAt}
                                thumbnail={item.thumbnail || 'default-thumbnail-url'}
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

import LesssonContentHeader from '~/components/LesssonContentHeader';
import CardVideo from '~/components/CardVideo';

import styles from './styles.module.css';
import useFolderStore from '~/store/useFolderStore';
import { useQuery } from 'react-query';
import { getLessonByClassId } from '~/repositories/lesson';
import useLessonStore from '~/store/useLessonStore';

function LesssonContent() {
    const { lessons, id: lessonId, setId } = useLessonStore((state) => state);

    return (
        <div className={styles.wrap}>
            <LesssonContentHeader />
            <div className={styles.list_card}>
                {lessons && lessons?.length > 0 ? (
                    lessons.map((item: any, index: any) => (
                        <CardVideo
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
                        />
                    ))
                ) : (
                    <div className={styles.noVideo}>Lớp học chưa có bài giảng nào</div>
                )}
            </div>
        </div>
    );
}

export default LesssonContent;

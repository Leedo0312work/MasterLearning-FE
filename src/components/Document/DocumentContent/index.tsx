import DocumentContentHeader from '../DocumentContentHeader';
import styles from './styles.module.css';
import useLessonStore from '~/store/useLessonStore';
import CardDocument from '~/components/CardDocument';

function DocumentContent() {
    const { lessons, id: lessonId, setId } = useLessonStore((state) => state);

    return (
        <div className={styles.wrap}>
            <DocumentContentHeader />
            <div className={styles.list_card}>
                {lessons && lessons.length > 0 ? (
                    lessons
                        .filter((lesson) => lesson.type === 0)
                        .map((item) => (
                            <CardDocument
                                id={item?.id}
                                active={item?.id === lessonId}
                                onClick={() => setId(item.id)}
                                key={item.name}
                                name={item.name}
                                viewer={item.viewer}
                                time={item?.time}
                                createdAt={item.createdAt}
                                thumbnail={item.thumbnail || 'default-thumbnail-url'}
                            />
                        ))
                ) : (
                    <div className={styles.noVideo}>Lớp học chưa có tài liệu nào</div>
                )}
            </div>
        </div>
    );
}

export default DocumentContent;

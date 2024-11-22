import styles from './styles.module.css';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import SiderbarRightMemberItem from '../SiderbarRightMemberItem';
import PropTypes from 'prop-types';
import DocumentSiderbarRightItem from '../SiderbarRightMemberItem';
import { censorLesson } from '~/repositories/lesson';
import { useEffect } from 'react';
import { getNotCensoredLessons } from '~/repositories/lesson';
import { useState } from 'react';
import { ILesson } from '~/models/ILesson';

function DocumentSiderbarRight() {
    const tempData = [
        {
            id: '673f5aac820ff0f397ce8ef8',
            teacher_id: '67137b0d06c4bf247ebc5c56',
            class_id: '6716671a26ef0f87c9df73aa',
            name: 'Cấu trúc dữ liệu và giải thuật',
            description: 'fdsgdfg',
            type: 0,
            media: [
                {
                    url: 'https://master-learning.s3.ap-southeast-1.amazonaws.com/pdfs/53d508c4f6890590fd9fb5900.pdf',
                    type: 3,
                },
            ],
            censored: false,
            deleted_At: null,
            created_at: '2024-11-21T16:07:08.149Z',
            updated_at: '2024-11-21T16:07:08.149Z',
        },
        {
            id: '673f5aac820ff0f397ce8k9s',
            teacher_id: '67137b0d06c4bf247ebc5c56',
            class_id: '6716671a26ef0f87c9df73aa',
            name: 'Chuyển động cơ học lượng tử',
            description: 'fdsgcsdcsdcsdcsdcdfg',
            type: 0,
            media: [
                {
                    url: 'https://master-learning.s3.ap-southeast-1.amazonaws.com/pdfs/53d508c4f6890590fd9fb5900.pdf',
                    type: 3,
                },
            ],
            censored: false,
            deleted_At: null,
            created_at: '2024-11-21T16:07:08.149Z',
            updated_at: '2024-11-21T16:07:08.149Z',
        },
    ];

    const [lessonsNotCensor, setLessonsNotCensor] = useState<ILesson[]>(tempData);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log('Initial data (mock): ', lessonsNotCensor);
    }, []);

    const handleReject = (lessonId: string) => {
        // Xóa tài liệu khỏi danh sách
        setLessonsNotCensor((prevLessons) =>
            prevLessons.filter((lesson) => lesson.id !== lessonId),
        );
    };
    // Lấy danh sách tài liệu chưa kiểm duyệt
    // const fetchLessons = async () => {
    //     setLoading(true);
    //     try {
    //         const lessonsNotCensor = await getNotCensoredLessons();
    //         setLessonsNotCensor(lessonsNotCensor);
    //         console.log('lessonsNotCensor: ', lessonsNotCensor);
    //     } catch (error) {
    //         console.error('Error fetching lessonsNotCensor:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchLessons();
    // }, []);

    // const handleCensor = async (lessonId: string) => {
    //     try {
    //         await censorLesson(lessonId);
    //         alert('Tài liệu đã được kiểm duyệt.');
    //         // fetchLessons(); // Tải lại danh sách sau khi kiểm duyệt
    //     } catch (error) {
    //         console.error('Error censoring lesson:', error);
    //         alert('Đã có lỗi xảy ra khi kiểm duyệt.');
    //     }
    // };

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.header}>Chờ duyệt({lessonsNotCensor?.length})</div>
                {lessonsNotCensor.length > 0 ? (
                    <div className={styles.info}>
                        {/* <div className={styles.all}>
                            <Button className={styles.accept}>Phê duyệt </Button>
                            <Button className={styles.refuse}>Từ chối </Button>
                        </div> */}
                        <div className={styles.listUser}>
                            {lessonsNotCensor.map((item: any, index: any) => (
                                <DocumentSiderbarRightItem
                                    key={item.id}
                                    name={item?.name}
                                    classId={item?.class_id}
                                    censorData={item}
                                    onReject={handleReject}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.noStudent}>
                        Yêu cầu duyệt sẽ được hiển thị khi có tài liệu được tải lên
                    </div>
                )}
            </div>
        </div>
    );
}
DocumentSiderbarRight.propTypes = {
    data: PropTypes.array,
};
export default DocumentSiderbarRight;

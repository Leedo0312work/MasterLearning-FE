import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './styles.module.css';
import useFolderStore from '~/store/useFolderStore';
import { useQuery } from 'react-query';
import { getLessonByClassId } from '~/repositories/lesson';
import useLessonStore from '~/store/useLessonStore';
import { useMemo } from 'react';
import { ILesson } from '~/models/ILesson';
import dayjs from '~/packages/dayjs';
import { useConfirm } from 'material-ui-confirm';

const actions = [
    // {
    //     name: 'Xem bài giảng',
    //     Icon: OndemandVideoIcon,
    //     to: '',
    // },
    // {
    //     name: 'Chỉnh sửa',
    //     Icon: BorderColorIcon,
    //     to: 'alo/edit',
    // },
    {
        name: 'Xóa bài giảng',
        Icon: DeleteOutlineIcon,
        to: '',
    },
];

function SiderbarRightLesson() {
    const { lessons, selectedLessonId } = useLessonStore((state) => ({
        lessons: state.lessons,
        selectedLessonId: state.selectedLessonId
    }));
    const { id: classId } = useParams();
    const navigate = useNavigate();
    const confirm = useConfirm();
    

    const lesson = useMemo(() => {
        return lessons?.find((item) => item.id === selectedLessonId);
    }, [lessons, selectedLessonId]);

    const handleClickView = () => {
        navigate(`/class/${classId}/content/1/view/${selectedLessonId}`);
    };

    const handleEdit = () => {
        console.log('selectedLessonId', selectedLessonId);
        console.log('classId', classId);
        navigate(`/class/${classId}/content/1/edit/${selectedLessonId}`);
    };

    const handleDelete = () => {
        confirm({
            title: 'Xác nhận xóa',
            description: 'Bạn có chắc chắn muốn xóa bài giảng này?',
            confirmationText: 'Xóa',
            cancellationText: 'Hủy',
        })
        .then(() => {
            // Thực hiện xóa ở đây
            // Bạn có thể gọi hàm onDeleteSuccess nếu có
        })
        .catch(() => {
            // Hủy xóa
        });
    };

    console.log('selectedLessonId', selectedLessonId);

    return (
        <div className={styles.wrap}>
            <div className={styles.top}>
                <h3 className={styles.header_top}>{lesson?.name}</h3>
                <div className={styles.top_content}>
                    <h4 className={styles.top_item}>
                        <h5 className={styles.top_name}>Đã xem</h5>
                        <span className={styles.title}>100</span>
                    </h4>
                    <h4 className={styles.top_item}>
                        <h5 className={styles.top_name}>Ngày tạo</h5>
                        <span className={styles.title}>
                            {dayjs(lesson?.createdAt).format('HH:mm:ss DD/MM/YYYY')}
                        </span>
                    </h4>
                </div>
            </div>
            <div className={styles.bottom}>
                <div onClick={handleClickView} className={styles.bottom_item}>
                    <h4 className={styles.name}>Xem bài giảng</h4>
                    <h5 className={styles.icon}>
                        <OndemandVideoIcon />
                    </h5>
                </div>
                <div onClick={handleEdit} className={styles.bottom_item}>
                    <h4 className={styles.name}>Sửa</h4>
                    <h5 className={styles.icon}>
                        <BorderColorIcon />
                    </h5>
                </div>
                <div onClick={handleDelete} className={styles.bottom_item}>
                    <h4 className={styles.name}>Xóa</h4>
                    <h5 className={styles.icon}>
                        <DeleteOutlineIcon />
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default SiderbarRightLesson;

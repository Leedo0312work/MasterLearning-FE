
// @ts-ignore
import styles from './style.module.scss';
// @ts-ignore
import images from '~/assets/images/default_classes2.jpg';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IClass } from '~/models/IClass';
import useAuthStore from '~/store/useAuthStore';
import ClearIcon from '@mui/icons-material/Clear';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { getDeleteClass } from '~/repositories/class';

type Prop = Pick<IClass, 'name' | '_id' | 'code' | 'teacher', 'handleDelete'>;

function CardCourse({ name, _id, code, teacher, handleDelete }: Prop) {

    const { confirm } = Modal;
    const user = useAuthStore((state) => state.user); 

    const confirmDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        confirm({
            title: 'Bạn có chắc chắn muốn xóa lớp học này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDelete(_id);
            },
            onCancel() {
                console.log('Hủy xóa');
            },
        });
    };


    return (
        <Link to={`/class/${_id}/newsfeed`} className={styles.cover}>
            <div className={styles.course}>
                <div className={styles.img_wrap}>
                    <img className={styles.img} src={images} alt="" />
                </div>
                <div className={styles.contant}>
                    <div className={styles.text_wrap}>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.code}>{code}</p>
                    </div>
                    <div className={styles.teachers}>
                        {teacher.map((teacher:any, index:any) => {
                            const teacherInitial = teacher.name.charAt(0).toUpperCase();
                            return (
                                <div key={index} className={styles.avatar_wrap}>
                                    {teacher.avatar ? (
                                        <img
                                            className={styles.avatar}
                                            src={teacher.avatar}
                                            alt="Teacher Avatar"
                                        />
                                    ) : (
                                        <div className={styles.avatar_placeholder}>
                                            {teacherInitial}
                                        </div>
                                    )}
                                    <p className={styles.teacher_name}>{teacher.name}</p>
                                </div>
                            );
                        })}
                    </div>
                    {user?.role === 2 &&
                        <div className={styles.btnDelete}  onClick={confirmDelete}>
                            <ClearIcon /> Xóa lớp
                        </div>
                    }
                </div>
            </div>
        </Link>
    );
}

export default memo(CardCourse);
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MouseIcon from '@mui/icons-material/Mouse';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import styles from './styles.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import SiderbarRightHomeWorkTitleItem from '~/components/SiderbarRightHomeWorkTitleItem';
import SiderbarRightHomeWorkSettingItem from '~/components/SiderbarRightHomeWorkSettingItem';
import useGetExerciseInClass from '~/hooks/useGetExercisesInClass';
import useExercisesInClassStore from '~/store/useExercisesInClassStore';
import dayjs from '~/packages/dayjs';
import { IExercise } from '~/models/IExercise';
import { getExerciseStudentRole, getTextExerciseMode } from '~/enums/exercise';
import PermissionWrapper from '~/components/PermissionWrapper';
import { Role } from '~/enums/role';
import { getListExercisesStudent, getDeleteMultipleChoice } from '~/repositories/exercise';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import useAuthStore from '~/store/useAuthStore';

const { confirm } = Modal;

function SiderbarRightHomeWork() {
    const id = useExercisesInClassStore((state) => state._id);
    const { id: classId, _id: exerciseId } = useParams();
    const [data, setData] = useState<IExercise[]>([]);

    const user = useAuthStore((state) => state.user);
    console.log('check user', user);
    const queryClient = useQueryClient();

    const location = useLocation();

    const isExam = location.pathname.includes('exam');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exercises = await getListExercisesStudent(classId);
                console.log('checex', exercises);
                setData(exercises);
            } catch (error) {
                console.error('Không thể lấy danh sách :', error);
            }
        };
        fetchData();
    }, [classId]);
    console.log('check', Role);
    const exercise = useMemo(() => data.find((item) => item._id === id), [id, data]);

    const { mutate: handleDelete } = useMutation(
        'delete',
        () =>
            getDeleteMultipleChoice({
                id: exercise?._id,
            }),
        {
            onSuccess: () => {
                setData((prevData) => prevData.filter((item) => item._id !== exercise?._id));
                console.log('Exercise deleted successfully');
                queryClient.invalidateQueries(['exercises', classId]);
            },
            onError: (error) => {
                console.error('Failed to delete exercise:', error);
            },
        },
    );

    const confirmDelete = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa bài tập này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDelete();
                toast.success('Xoá bài tập thành công');
            },
            onCancel() {
                console.log('Hủy xóa');
            },
        });
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.top}>
                <h3 className={styles.header_top}>{exercise?.name}</h3>
                <div className={styles.share}></div>
                <div className={styles.top_content}>
                    <SiderbarRightHomeWorkTitleItem
                        name="Số lần làm bài"
                        value={exercise?.times_to_do.toString()}
                    />
                    <SiderbarRightHomeWorkTitleItem
                        name="Lấy điểm"
                        value={getTextExerciseMode(exercise?.point_type)}
                    />
                    <SiderbarRightHomeWorkTitleItem
                        name="Ngày tạo"
                        value={dayjs(exercise?.created_at).format('DD/MM/YYYY')}
                    />
                    {isExam ? (
                        <>
                            <SiderbarRightHomeWorkTitleItem
                                name="Bắt đầu"
                                value={
                                    exercise?.time_to_enable
                                        ? dayjs(exercise?.time_to_enable).format('HH:mm DD/MM/YYYY')
                                        : 'Không có'
                                }
                            />
                            <SiderbarRightHomeWorkTitleItem
                                name="Hạn chót"
                                value={
                                    exercise?.deadline
                                        ? dayjs(exercise?.deadline).format('HH:mm DD/MM/YYYY')
                                        : 'Không có'
                                }
                            />
                        </>
                    ) : (
                        <></>
                    )}

                    <SiderbarRightHomeWorkTitleItem
                        name="Thời lượng"
                        value={exercise?.time_limit.toString()}
                    />
                    <SiderbarRightHomeWorkTitleItem name="Đã làm" value="0/0" />
                    <SiderbarRightHomeWorkTitleItem
                        name="Cho phép"
                        value={getExerciseStudentRole(exercise?.student_role)}
                    />
                </div>
            </div>
            <div className={styles.bottom}>
                <PermissionWrapper role={Role.ADMIN}>
                    <SiderbarRightHomeWorkSettingItem
                        to=""
                        name="Làm thử"
                        Icon={OndemandVideoIcon}
                    />
                </PermissionWrapper>
                {/* <PermissionWrapper role={Role.STUDENT}></PermissionWrapper> */}
                <SiderbarRightHomeWorkSettingItem
                    to={`/class/${classId}/homework/${exercise?._id}/do`}
                    name="Vào thi"
                    Icon={OndemandVideoIcon}
                />
                {user?.role === 2 && (
                    <>
                        <SiderbarRightHomeWorkSettingItem
                            to={`/class/${classId}/homework/${exercise?._id}/edit`}
                            name="Chỉnh sửa"
                            Icon={BorderColorIcon}
                        />
                        <div className={styles.bottom_item} onClick={confirmDelete}>
                            <h4 className={styles.name}>Xóa</h4>
                            <DeleteOutlineIcon />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SiderbarRightHomeWork;

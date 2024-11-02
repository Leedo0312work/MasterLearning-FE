import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MouseIcon from '@mui/icons-material/Mouse';
import { useParams } from 'react-router-dom';

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
import { getListExercisesStudent } from '~/repositories/exercise';

function SiderbarRightHomeWork() {
    // const { data } = useGetExerciseInClass();

    const id = useExercisesInClassStore((state) => state._id);

    const { id: classId } = useParams();

    const [data, setData] = useState<IExercise[]>([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const exercises = await getListExercisesStudent(classId);
                    setData(exercises); 
                } catch (error) {
                    console.error('Không thể lấy danh sách :', error);
                }
            };

            fetchData();
    }, []); 

    const exercise = useMemo<IExercise | undefined>(() => {
        return data?.find((item) => item._id === id);
    }, [id, data]);

    console.log("Dữ liệu ở đây", exercise)

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
                    <SiderbarRightHomeWorkTitleItem
                        name="Bắt đầu"
                        value={
                            exercise?.time_to_enable
                                ? dayjs(exercise?.time_to_enable).format('HH:mm DD/MM/YYYY')
                                : 'Không có'
                        }
                    />
                    <SiderbarRightHomeWorkTitleItem
                        name="Thời lượng"
                        value={exercise?.time_limit.toString()}
                    />
                    <SiderbarRightHomeWorkTitleItem name="Đã làm" value="0/0" />
                    <SiderbarRightHomeWorkTitleItem
                        name="Cho phép"
                        value={getExerciseStudentRole(exercise?.student_role)} 
                    />
                    <SiderbarRightHomeWorkTitleItem 
                        name="Hạn chót"
                        value={exercise?.deadline.toString()}
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
                <PermissionWrapper role={Role.STUDENT}>
                    <SiderbarRightHomeWorkSettingItem
                        to={`/class/${classId}/homework/${exercise?._id}/do`}
                        name="Vao thi"
                        Icon={OndemandVideoIcon}
                    />
                </PermissionWrapper>
                {/* <SiderbarRightHomeWorkSettingItem to="alo/edit" name="Chi tiết" Icon={MouseIcon} /> */}
                {/* <SiderbarRightHomeWorkSettingItem to="" name="Di chuyển" Icon={FolderOpenIcon} /> */}
                <SiderbarRightHomeWorkSettingItem
                    to={`/class/${classId}/homework/${exercise?._id}/edit`}
                    name="Chỉnh sửa"
                    Icon={BorderColorIcon}
                />
                <SiderbarRightHomeWorkSettingItem to="" name="Xóa" Icon={DeleteOutlineIcon} />
            </div>
        </div>
    );
}

export default SiderbarRightHomeWork;

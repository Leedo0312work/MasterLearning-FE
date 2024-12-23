import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MouseIcon from '@mui/icons-material/Mouse';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { Role, RoleInClass } from '~/enums/role';
import {
    getListExercisesStudent,
    getDeleteMultipleChoice,
    getMarkExercisesByStudent,
} from '~/repositories/exercise';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import useAuthStore from '~/store/useAuthStore';
import moment from 'moment';

const { confirm } = Modal;
interface IPoint {
    _id: string;
    point: number;
    created_at: Date;
}
function SiderbarRightHomeWork() {
    const id = useExercisesInClassStore((state) => state._id);
    const { id: classId, _id: exerciseId } = useParams();
    const [data, setData] = useState<IExercise[]>([]);
    const [disable, setDisable] = useState<boolean>(false);
    const user = useAuthStore((state) => state.user);
    const [dataPotnt, setDataPoint] = useState<IPoint[]>([]);
    const queryClient = useQueryClient();
    console.log('checkcc', id);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [dataPassword, setDataPassWord] = useState<string>('');
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = (event: any) => {
        event.preventDefault();
        setOpen(true);
    };
    const navigate = useNavigate();
    const handleOk = () => {
        console.log('cherck data pass', dataPassword);
        if (dataPassword == exercise?.password) {
            navigate(`/class/${classId}/homework/${exercise?._id}/do`);
            setOpen(false);
            toast.success('Nhập mật khẩu thành công');
        } else {
            toast.error('Nhập mật khẩu không đúng vui lòng nhập lại');
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const handleOnchange = (e: any) => {
        console.log('check', e.target.value);
        setDataPassWord(e.target.value);
    };
    const isExam = location.pathname.includes('exam');
    useEffect(() => {
        if (id) {
            const fetchDataPont = async (id: string) => {
                const data = await getMarkExercisesByStudent(id);
                setDataPoint(data);
            };
            fetchDataPont(id);
        }
    }, [id]);
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
    }, [classId]);
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

    const renderSiderRight = useMemo(() => {
        return (
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
                        value={exercise?.time_limit ? exercise?.time_limit.toString() : 'không có'}
                    />
                    <PermissionWrapper role={RoleInClass.Student}>
                        <SiderbarRightHomeWorkTitleItem
                            name="Đã làm"
                            value={
                                exercise?.done_count != undefined
                                    ? `${exercise?.done_count}/${exercise?.times_to_do}`
                                    : ''
                            }
                        />
                    </PermissionWrapper>
                    <SiderbarRightHomeWorkTitleItem
                        name="Cho phép"
                        value={getExerciseStudentRole(exercise?.student_role)}
                    />
                </div>
            </div>
        );
    }, [exercise]);
    const renderSiderPoint = useMemo(() => {
        return (
            <div className={styles.top} style={{ paddingBottom: 24 }}>
                <h3 className={styles.header_top}>Điểm số làm bài của bạn</h3>
                <div className={styles.share}></div>
                <div style={{ border: 'none' }}>
                    <SiderbarRightHomeWorkTitleItem
                        name="Số lần làm bài"
                        value={String(dataPotnt.length)}
                    />
                </div>
                <table style={{ width: '100%', textAlign: 'left' }}>
                    <tr style={{ fontSize: 14, color: '#333', paddingBottom: 6 }}>
                        <th style={{ width: '50%', fontWeight: 500, paddingBottom: 6 }}>Điểm</th>
                        <th style={{ width: '50%', fontWeight: 500, textAlign: 'right' }}>
                            Thời gian làm
                        </th>
                    </tr>
                    {dataPotnt &&
                        dataPotnt.map((item, index) => (
                            <tr
                                key={index}
                                style={{ fontSize: 14, color: '#333', margin: '4px 0' }}
                            >
                                <td style={{ color: 'red', paddingBottom: 6 }}>
                                    {item.point.toFixed(2)}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    {moment(item.created_at).format('DD/MM/YYYY HH:mm')}
                                </td>
                            </tr>
                        ))}
                </table>
            </div>
        );
    }, [dataPotnt]);
    console.log(exercise?.done_count, exercise?.times_to_do);
    console.log('check exercise', exercise);
    return (
        <div className={styles.wrap}>
            <Modal
                title="Yêu cầu"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <lable>Nhập mật khẩu: </lable>
                <input
                    type="password"
                    style={{ padding: '2px 4px', marginLeft: 16, outline: 'none' }}
                    onChange={handleOnchange}
                />
            </Modal>
            {id && renderSiderRight}
            {dataPotnt && dataPotnt.length > 0 && renderSiderPoint}
            {id && (
                <div className={styles.bottom}>
                    {/* <PermissionWrapper role={RoleInClass.Teacher}>
                        <SiderbarRightHomeWorkSettingItem
                            to=""
                            name="Làm thử"
                            Icon={OndemandVideoIcon}
                        />
                    </PermissionWrapper> */}
                    <PermissionWrapper role={RoleInClass.Teacher}>
                        <SiderbarRightHomeWorkSettingItem
                            to={`/class/${classId}/homework/${exercise?._id}/score`}
                            name="Chấm điểm"
                            Icon={OndemandVideoIcon}
                        />
                    </PermissionWrapper>
                    <PermissionWrapper role={RoleInClass.Teacher}>
                        <SiderbarRightHomeWorkSettingItem
                            to={`/class/${classId}/homework/${exercise?._id}/watchScore`}
                            name="Xem điểm"
                            Icon={OndemandVideoIcon}
                        />
                    </PermissionWrapper>
                    <PermissionWrapper role={RoleInClass.Student}>
                        <SiderbarRightHomeWorkSettingItem
                            password={exercise?.password}
                            disable={
                                exercise?.done_count &&
                                exercise?.times_to_do &&
                                Number(exercise?.done_count) >= Number(exercise?.times_to_do)
                            }
                            to={`/class/${classId}/homework/${exercise?._id}/do`}
                            name="Vào thi"
                            Icon={OndemandVideoIcon}
                            showModal={showModal}
                            handleOk={handleOk}
                            handleCancel={handleCancel}
                        />
                    </PermissionWrapper>

                    {user?.role === 2 && (
                        <>
                            {/* <SiderbarRightHomeWorkSettingItem
                                to={`/class/${classId}/homework/${exercise?._id}/edit`}
                                name="Chỉnh sửa"
                                Icon={BorderColorIcon}
                            /> */}
                            <div className={styles.bottom_item} onClick={confirmDelete}>
                                <h4 className={styles.name}>Xóa</h4>
                                <DeleteOutlineIcon />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default SiderbarRightHomeWork;

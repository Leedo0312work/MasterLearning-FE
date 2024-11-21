import { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TextField from '@mui/material/TextField';
import avatarDefault from '~/assets/images/avatar_default.png';
import ProfileInfoItem from '~/components/ProfileInfoItem';
import { getMe, getUpdateMe } from '~/repositories/auth';
import ModalEditProfile from '../ModalEditProfile';
import { toast } from 'react-toastify';
import mediaServices from '~/services/media';


function ProfileAccountInfo() {
    const [dataProfile, setDataProfile] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getMe();
                setDataProfile(res);
            } catch (error) {
                console.error('Không thể lấy thông tin:', error);
            }
        };

        fetchProfile();
    }, []);

    const data = useMemo(() => [
        {
            id: 1,
            Left_icon: 'https://shub.edu.vn/images/icons/profile-item/profile-item-username.svg',
            title: 'Tên',
            value: dataProfile?.name || '',
            edit: false,
            copy: true,
        },
        {
            id: 2,
            Left_icon: 'https://shub.edu.vn/images/icons/profile-item/profile-item-birthday.svg',
            title: 'Ngày sinh',
            value: dataProfile?.date_of_birth ? new Date(dataProfile.date_of_birth).toLocaleDateString() : '',
            edit: true,
            copy: false,
        },
        {
            id: 3,
            Left_icon: 'https://shub.edu.vn/images/icons/profile-item/profile-item-email.svg',
            title: 'Email',
            value: dataProfile?.email || '',
            edit: true,
            copy: false,
        },
    ], [dataProfile]);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSubmit = async (updatedData: { name: string; date_of_birth: string; avatar: string }) => {
        try {
            const response = await getUpdateMe(updatedData);
            setDataProfile(response);
            toast.success("Chỉnh sửa thông tin thành công")
            handleCloseModal();
        } catch (error) {
            console.error('Cập nhật thông tin không thành công:', error);
        }
    };

    const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        try {
            const response = await mediaServices.uploadImage(file);
            const avatarUrl = response?.result?.[0]?.url;

            console.log("avatar", avatarUrl)
            if (avatarUrl) {
                await handleSubmit({
                    name: dataProfile?.name || '',
                    date_of_birth: dataProfile?.date_of_birth || '',
                    avatar: avatarUrl,
                });
            }
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
            toast.error('Tải ảnh lên không thành công');
        }
    };
    

    return (
        <div className={styles.wrap}>
            <div className={styles.wrap_avatar}>
                <div className={styles.avatar}>
                    <img
                        className={styles.img}
                        alt="avatar"
                        src={dataProfile?.avatar || avatarDefault}
                    />
                    <label>
                        <CameraAltIcon className={styles.cameraAltIcon} />
                        <TextField type="file" className={styles.inputfile} onChange={onChangeFile} />
                    </label>
                </div>
                <div className={styles.upLoad}></div>
            </div>
            <h5 className={styles.title}>Thông tin tài khoản</h5>
            <div className={styles.list_info}>
                {data.map((item) => (
                    <ProfileInfoItem
                        key={item.id}
                        Left_icon={item.Left_icon}
                        title={item.title}
                        copy={item.copy}
                        edit={item.edit}
                        value={item.value}
                    />
                ))}
            </div>
            <div className={styles.edit} onClick={handleOpenModal}>
               Chỉnh sửa
            </div>
            
            {/* Modal component for editing profile */}
            <ModalEditProfile
                openAddModal={openModal}
                title="Chỉnh sửa thông tin"
                handleCloseAddModal={handleCloseModal}
                subMitForm={handleSubmit}
            />
        </div>
    );
}

export default ProfileAccountInfo;

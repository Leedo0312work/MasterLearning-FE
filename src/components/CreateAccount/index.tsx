import React, { useState } from 'react';
import styles from './styles.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModalAccount from '../ModalAccount';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getRegister } from '~/repositories/auth';
import { RegisterForm, RegisterResponse } from '~/types/register';
import { ResponseAPI } from '~/app/response';

const CreateAccount = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const mutation = useMutation<RegisterResponse, AxiosError<ResponseAPI>, RegisterForm>(getRegister, {
        onSuccess: () => {
            toast.success("Tạo tài khoản thành công");
            handleCloseModal();
        },
        onError: (error) => {
            toast.error(`Tạo tài khoản không thành công: ${error.response?.data?.message || 'Đã có lỗi xảy ra'}`);
        }
    });

    const submitForm = (data: RegisterForm) => {
        mutation.mutate(data);
    };

    return (
        <div>
            <button className={styles.btnAdd} onClick={handleOpenModal}>
                <AddCircleOutlineIcon /> Thêm dữ liệu
            </button>
            <ModalAccount 
                open={openModal}
                onClose={handleCloseModal}
                submitForm={submitForm} 
                title = "Tạo tài khoản"
            />
        </div>
    );
}

export default CreateAccount;

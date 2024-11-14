import styles from './styles.module.css';

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'; 
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { CreateClassForm } from '~/types/class';

interface Prop {
    openAddModal: boolean;
    title: string;
    handleCloseAddModal: () => void;
    subMitForm: (data: { name: string; date_of_birth: string }) => void;
}

function ModalEditProfile({
    openAddModal = false,
    title,
    handleCloseAddModal = () => {},
    subMitForm,
}: Prop) {

    const { register, handleSubmit, reset } = useForm();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const submit = (data: any) => {
        const name = data.name.trim();
        const date_of_birth = data.date_of_birth;

        reset({
            name: '',
            date_of_birth: '',
        });

        handleCloseAddModal();
        subMitForm({         
            name,
            date_of_birth,
        });
    };

    return (
        <div>
            <Modal
                open={openAddModal}
                onClose={handleCloseAddModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                    className={styles.box}
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(submit)}
                >
                    <div className={styles.header}>
                        <div className={styles.header_text}>{title}</div>
                        <div className={styles.close}>
                            <CloseIcon
                                onClick={handleCloseAddModal}
                                sx={{ fontSize: 21, margin: 'auto', color: 'rgba(0, 0, 0, 0.54)' }}
                            />
                        </div>
                    </div>
                    <div className={styles.content}>
                        <TextField
                            {...register('name', { required: 'Please enter your class name.' })}
                            name="name"
                            className={styles.input}
                            id="outlined-basic"
                            label="Tên"
                            variant="outlined"
                        />
                        <TextField
                            {...register('date_of_birth', { required: 'Please select your date of birth.' })}
                            name="date_of_birth"
                            className={styles.input}
                            id="outlined-basic"
                            label="Ngày sinh"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div className={styles.footer}>
                        <Button
                            type="submit"
                            className={clsx(styles.submit, { [styles.active]: true })}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalEditProfile;

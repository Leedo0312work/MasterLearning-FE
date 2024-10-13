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
import { MenuItem, Select } from '@mui/material';

interface Prop {
    openAddModal: boolean;
    title: string;
    handleCloseAddModal: () => void;
    subMitForm: (data: CreateClassForm) => void;
}

function ClassModalAddEdit({
    openAddModal = false,
    title,
    handleCloseAddModal = () => {},
    subMitForm,
}: Prop) {
    const [classType, setClassType] = useState('')

    const { register, handleSubmit, reset } = useForm<CreateClassForm>({
        defaultValues: {
            type: '',
        },
        shouldUseNativeValidation: true,
    });
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

    const submit = (data: CreateClassForm) => {
        const name = data.name.trim();
        const description = data.description.trim();
        const type = data.type.trim();
        const topic = data.topic.trim();

        const password = data.password?.trim() || '';

        reset({
            type: '',
            name: '',
            description: '',
            topic: '',
            password: '',
        });

        handleCloseAddModal();
        subMitForm({
            type,
            name,
            description,
            topic,
            password,
        });

        console.log(data);
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
                        <Select
                            {...register('type', { required: 'Please choose your class type.' })}
                            name="type"
                            className={styles.input}
                            variant="outlined"
                            displayEmpty
                            defaultValue=""
                            //onChange={(e) => setClassType(e.target.value)}
                        >
                            <MenuItem value="" disabled>
                                Chọn loại lớp học
                            </MenuItem>
                            <MenuItem value="Public">Công khai</MenuItem>
                            <MenuItem value="Private">Riêng tư</MenuItem>
                            <MenuItem value="Security">Bảo mật</MenuItem>
                        </Select>
                        <TextField
                            {...register('name', { required: 'Please enter your class name.' })}
                            name="name"
                            className={styles.input}
                            id="outlined-basic"
                            label="Tên lớp học"
                            variant="outlined"
                        />
                        <TextField
                            {...register('description')}
                            name="description"
                            className={styles.input}
                            id="outlined-basic"
                            label="Mô tả"
                            variant="outlined"
                        />
                        <TextField
                            {...register('topic', { required: 'Please enter topic.' })}
                            name="topic"
                            className={styles.input}
                            id="outlined-basic"
                            label="Topic"
                            variant="outlined"
                        />
                        {/* {classType === 'Security' && (
                            <TextField
                                {...register('password', { required: 'Please enter a password.' })}
                                name="password"
                                type="password"
                                className={styles.input}
                                id="outlined-password"
                                label="Mật khẩu"
                                variant="outlined"
                            />
                        )} */}
                    </div>
                    <div className={styles.footer}>
                        <Button
                            type="submit"
                            className={clsx(styles.submit, { [styles.active]: true })}
                        >
                            Thêm
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ClassModalAddEdit;

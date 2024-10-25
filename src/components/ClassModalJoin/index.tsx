import styles from './styles.module.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {useState } from 'react';
import { getSearch } from '~/repositories/class';
import CardSearch from '../CardSearch/CardSearch';

function ClassModalJoin({ openJoinModal = false, handleCloseJoinModal = () => {} }) {

    const [FindedClass, setFindedClass] = useState<any>(null);

    const handleFindClass = async (data: any) => {
        console.log("Dữ liệu", data.code);
        try {     
            const res = await getSearch(data.code);

            if (res.result) {
                console.log("Kết quả", res.result);
                setFindedClass(res.result);
                toast.success('Tìm thấy lớp học!');
            } else {
                setFindedClass(null); 
                toast.error('Không tìm thấy lớp học.');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
        }
    };

    const { register, handleSubmit, reset } = useForm({ shouldUseNativeValidation: true });
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
        const code = data.code.trim();

        reset({
            code: '',
        });

        // handleCloseJoinModal();
        handleFindClass(data);
    };

    const handleCloseCard = () => {
        setFindedClass(null)
    }

    return (
        <div>
            <Modal
                open={openJoinModal}
                onClose={handleCloseJoinModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={styles.box} component="form" noValidate onSubmit={handleSubmit(submit)}>
                    <div className={styles.header}>
                        <div className={styles.header_text}>Tham gia lớp học</div>
                        <div className={styles.close}>
                            <CloseIcon
                                onClick={handleCloseJoinModal}
                                sx={{ fontSize: 21, margin: 'auto', color: 'rgba(0, 0, 0, 0.54)' }}
                            />
                        </div>
                    </div>
                    <div className={styles.content}>
                        <TextField
                            {...register('code', { required: 'Please enter  classes code.' })}
                            name="code"
                            className={styles.input}
                            id="outlined-basic"
                            label="Nhập code lớp học"
                            variant="outlined"
                        />
                    </div>
                    <div className={styles.footer}>
                        <Button type="submit" className={clsx(styles.submit, { [styles.active]: true })}>
                            Tìm kiếm lớp học
                        </Button>
                    </div>

                    {FindedClass && <CardSearch findedClass = {FindedClass} closeCard = {handleCloseCard}/>}
                </Box>
            </Modal>
        </div>
    );
}
ClassModalJoin.propTypes = {
    openAddModal: PropTypes.bool,
    handleCloseAddModal: PropTypes.func,
    subMitForm: PropTypes.func,
};
export default ClassModalJoin;

import * as React from 'react';
import { useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Button,
    TextField,
    Typography,
    Modal,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import styles from './styles.module.css';
import { RegisterForm } from '~/types/register';
import { IUser } from '~/models/IUser';

interface ModalEditAccountProps {
    open: boolean;
    onClose: () => void;
    submitForm: (data: RegisterForm) => void;
    title: string
    account: IUser | null;
}

export default function ModalEditAccount({ open, onClose, submitForm, title, account }: ModalEditAccountProps) {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<RegisterForm>({
        defaultValues: {
            email: account?.email || '',
            name: account?.name || '',
            date_of_birth: account?.date_of_birth ? new Date(account.date_of_birth).toISOString().split("T")[0] : '',
            role: account?.role || 1,
            verify: account?.verify
        }
    });

    useEffect(() => {
        console.log(account?.verify);

        reset({
            email: account?.email || '',
            name: account?.name || '',
            date_of_birth: account?.date_of_birth ? new Date(account.date_of_birth).toISOString().split("T")[0] : '',
            role: account?.role || 1,
            verify: account?.verify
        });
    }, [account, reset]);

    const onSubmit = (data: RegisterForm) => {
        submitForm(data);
        reset();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                className={styles.box}
            >
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">{title}</Typography>
                    <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
                </Box>

                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    {...register('email', {
                        required: 'Vui lòng nhập địa chỉ email',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email không hợp lệ'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Họ tên"
                    {...register('name', { required: 'Vui lòng nhập họ tên' })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Ngày sinh"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register('date_of_birth', { required: 'Vui lòng nhập ngày sinh' })}
                    error={!!errors.date_of_birth}
                    helperText={errors.date_of_birth?.message}
                />

                <FormControl fullWidth margin="normal" error={!!errors.role}>
                    <InputLabel>Role</InputLabel>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue={1}
                        rules={{ required: 'Vui lòng chọn một vai trò' }}
                        render={({ field }) => (
                            <Select {...field}>
                                <MenuItem value={1}>Học sinh</MenuItem>
                                <MenuItem value={2}>Giáo viên</MenuItem>
                                <MenuItem value={3}>Admin</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                    <InputLabel>Trạng thái</InputLabel>
                    <Controller
                        name="verify"
                        control={control}
                        rules={{ required: 'Vui lòng chọn một trạng thái' }}
                        render={({ field }) => (
                            <Select {...field}>
                                <MenuItem value={0}>Không xác thực</MenuItem>
                                <MenuItem value={1}>Xác thực</MenuItem>
                                <MenuItem value={2}>Chặn</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, backgroundColor: '#1C7DDF', color: '#fff', borderRadius: '10px' }}
                    className={clsx(styles.submit, { [styles.active]: true })}
                >
                    Xác nhận
                </Button>
            </Box>
        </Modal>
    );
}

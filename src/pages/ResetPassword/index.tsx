// @ts-ignore
import resetImage from '~/assets/images/reset.jpg';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ResponseAPI } from '~/app/response';
import { ResetPasswordRequest } from '~/types/resetPassword'; // Cập nhật import phù hợp với kiểu dữ liệu ResetPassword
import { resetPassword } from '~/repositories/auth'; // Sử dụng đúng tên hàm từ repository
import { useRef } from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5', // Blue color for the primary elements
        },
    },
});

export default function ResetPassword() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<ResetPasswordRequest>();
    const password = useRef({});
    password.current = watch('password', '');

    const navigate = useNavigate();
    const location = useLocation();
    const forgotPasswordToken = decodeURIComponent(new URLSearchParams(location.search).get('token') || '');

    if (!forgotPasswordToken) {
        toast.error('Token không hợp lệ. Vui lòng yêu cầu lại liên kết đặt lại mật khẩu.');
        navigate('/forgot-password');
        return;
      }

    const { mutate } = useMutation<
        ResponseAPI<any>, // Đổi kiểu dữ liệu nếu cần
        AxiosError<ResponseAPI>,
        ResetPasswordRequest
    >('submit', async (data) => resetPassword({ ...data, forgotPasswordToken: forgotPasswordToken }), {
        onSuccess(data) {
            toast.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại tài khoản.');
            navigate('/login');
        },
        onError(error) {
            toast.error('Đặt lại mật khẩu thất bại. Vui lòng thử lại sau.');
        }
    });

    const submit = (data: ResetPasswordRequest) => {
        if (!forgotPasswordToken) {
            toast.error('Token không hợp lệ.');
            return;
        }
        setIsSubmitting(true);
        mutate({ ...data, forgotPasswordToken }, {
            onSettled: () => setIsSubmitting(false)  
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', background: 'linear-gradient(to right, #e0f7fa, #3f51b5)' }}>
                <Grid item xs={10} md={4}>
                    <Paper elevation={3} sx={{ p: 5, borderRadius: '16px', textAlign: 'center' }}>
                        <img
                            src={resetImage}
                            alt="Reset password illustration"
                            style={{ width: '200px', marginBottom: '20px' }}
                        />
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                            Reset Password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(submit)} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="New Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                {...register('password', {
                                    required: 'Please enter your new password',
                                })}
                                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px', borderColor: '#3f51b5' }}}
                                InputProps={{
                                    style: { borderColor: '#3f51b5' }, // blue outline for input
                                }}
                            />
                            {errors.password && (
                                <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                                    {errors.password.message}
                                </Typography>
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) =>
                                        value === password.current || 'Passwords do not match',
                                })}
                                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px', borderColor: '#3f51b5' }}}
                                InputProps={{
                                    style: { borderColor: '#3f51b5' }, 
                                }}
                            />
                            {errors.confirmPassword && (
                                <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                                    {errors.confirmPassword.message}
                                </Typography>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#3f51b5', color: 'white', borderRadius: '8px', '&:hover': { backgroundColor: '#303f9f' } }}
                            >
                                {isSubmitting ? 'Processing...' : 'Submit'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

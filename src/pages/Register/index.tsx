import React, { useState } from 'react';

import googleIcon from '~/assets/images/gg.png';

import register1 from '~/assets/images/register.png';

import appleIcon from '~/assets/images/apple.png';

import facebookIcon from '~/assets/images/fb.png';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import API from '~/network/API';
import useAuthStore from '~/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RegisterForm, RegisterResponse } from '~/types/register';
import { getLogin, getRegister } from '~/repositories/auth';
import { ResponseAPI } from '~/app/response';
import { AxiosError } from 'axios';
import { useRef } from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Register() {
    const [email, setEmail] = useState<string>('');
    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
        watch,
    } = useForm<RegisterForm>();
    const password = useRef({});
    password.current = watch('password', '');

    const navigate = useNavigate();

    const { mutate } = useMutation<
        ResponseAPI<RegisterResponse>,
        AxiosError<ResponseAPI>,
        RegisterForm
    >('submit', async (data) => getRegister(data), {
        onSuccess(data) {
            toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');

            navigate(`/check-email-noti?email=${encodeURIComponent(email)}`);
        },
        onError(error) {
            if (error.response?.status === 422) {
                toast.error('Dữ liệu nhập không hợp lệ hoặc Email đã tồn tại.');
            } else {
                toast.error('Đăng ký thất bại. Vui lòng thử lại sau.');
            }
        },
    });

    const submit = (data: RegisterForm) => {
        mutate(data);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#F9FAFC' }}>
                <CssBaseline />

                <Grid
                    item
                    xs={12}
                    sm={7}
                    md={7}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            src={register1}
                            alt="Register Illustration"
                            style={{ maxWidth: '300px' }}
                        />
                        <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                            Bạn đã có tài khoản?
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                            Chúng tôi rất vui khi được chào đón bạn trở lại
                        </Typography>
                        <Button
                            href="/login"
                            variant="outlined"
                            sx={{ px: 4, borderColor: '#1A237E', color: '#1A237E' }}
                        >
                            Đăng nhập
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={false} sm={5} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 4,
                            mx: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
                            Tạo tài khoản
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Bắt đầu bằng cách tạo tài khoản mới của bạn
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(submit)}
                            sx={{ mt: 1, width: '100%' }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                value={email}
                                {...register('email', {
                                    required: 'Vui lòng nhập địa chỉ email',
                                    onChange: (e) => setEmail(e.target.value),
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Email không hợp lệ',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p style={{ color: 'red', margin: 3 }}>{errors.email.message}</p>
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Họ tên"
                                type="name"
                                id="name"
                                {...register('name', {
                                    required: 'Please enter your username.',
                                })}
                            />
                            {errors.name && (
                                <p style={{ color: 'red', margin: 3 }}>{errors.name.message}</p>
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label=""
                                type="date"
                                id="date_of_birth"
                                {...register('date_of_birth', {
                                    required: 'Please enter your birthday.',
                                })}
                            />
                            {errors.date_of_birth && (
                                <p style={{ color: 'red', margin: 3 }}>
                                    {errors.date_of_birth.message}
                                </p>
                            )}

                            <FormControl fullWidth margin="normal" error={!!errors.role}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue={1}
                                    rules={{ required: 'Please select a role.' }}
                                    render={({ field }) => (
                                        <Select
                                            labelId="role-label"
                                            id="role"
                                            label="Role"
                                            {...field}
                                        >
                                            <MenuItem value={1}>Student</MenuItem>
                                            <MenuItem value={2}>Teacher</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.role && (
                                    <FormHelperText>{errors.role.message}</FormHelperText>
                                )}
                            </FormControl>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register('password', {
                                    required: 'Please enter your password.',
                                    minLength: 6,
                                })}
                            />
                            {errors.password && (
                                <p style={{ color: 'red', margin: 3 }}>{errors.password.message}</p>
                            )}

                            <TextField
                                margin="normal"
                                {...register('confirmPassword', {
                                    required: 'Please enter your repeat password.',
                                    validate: (value) =>
                                        value === password.current || 'The passwords do not match',
                                })}
                                required
                                fullWidth
                                label="Xác nhận mật khẩu"
                                type="password"
                                autoComplete="current-password"
                            />
                            {errors.confirmPassword && (
                                <p style={{ color: 'red', margin: 1 }}>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 1,
                                    backgroundColor: '#1A237E',
                                    color: '#fff',
                                    borderRadius: '20px',
                                }}
                            >
                                Đăng ký
                            </Button>

                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                sx={{ mt: 2 }}
                            >
                                <Typography variant="body2" color="textSecondary" sx={{ mx: 1 }}>
                                    Or
                                </Typography>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={4}>
                                    <Button fullWidth sx={{ borderColor: '#ddd' }}>
                                        <img src={googleIcon} alt="Google" width="24" />
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button fullWidth sx={{ borderColor: '#ddd' }}>
                                        <img src={appleIcon} alt="Apple" width="24" />
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button fullWidth sx={{ borderColor: '#ddd' }}>
                                        <img src={facebookIcon} alt="Facebook" width="24" />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

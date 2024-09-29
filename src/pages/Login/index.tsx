import * as React from 'react';
// @ts-ignore
import googleIcon from '~/assets/images/gg.png';
// @ts-ignore
import login from '~/assets/images/Login.png';
// @ts-ignore
import appleIcon from '~/assets/images/apple.png';
// @ts-ignore
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
import { LoginForm, LoginResponse } from '~/types/login';
import { getLogin } from '~/repositories/auth';
import { ResponseAPI } from '~/app/response';
import { AxiosError } from 'axios';

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

export default function SignInSide() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        defaultValues: {
            email: 'datminiphi@gmail.com',
            password: '12345678',
        },
    });

    const setUser = useAuthStore((state) => state.setUser);

    const navigate = useNavigate();

    const { mutate } = useMutation<ResponseAPI<LoginResponse>, AxiosError<ResponseAPI>, LoginForm>(
        'submit',
        async (data) => getLogin(data),
        {
            onSuccess(data) {
                    localStorage.setItem('accessToken', data.result.accessToken);
                    console.log('data: ',data);
                    setUser(data.result.user);  
                    window.location.href = '/class';
                    toast.success('Chào mừng bạn trở lại');
            },
            onError(error) {
                console.error('Lỗi khi đăng nhập:', error);
                toast.error('Đăng nhập không thành công. Vui lòng thử lại sau.');
            },
        },
    );

    const submit = (data: LoginForm) => {
        mutate(data);
    };

    // return (
    //     <ThemeProvider theme={theme}>
    //         <Grid container component="main" sx={{ height: '100vh' }}>
    //             <CssBaseline />
    //             <Grid
    //                 item
    //                 xs={false}
    //                 sm={4}
    //                 md={7}
    //                 sx={{
    //                     backgroundImage: 'url(https://source.unsplash.com/random)',
    //                     backgroundRepeat: 'no-repeat',
    //                     backgroundColor: (t) =>
    //                         t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    //                     backgroundSize: 'cover',
    //                     backgroundPosition: 'center',
    //                 }}
    //             />
    //             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    //                 <Box
    //                     sx={{
    //                         my: 8,
    //                         mx: 4,
    //                         display: 'flex',
    //                         flexDirection: 'column',
    //                         alignItems: 'center',
    //                     }}
    //                 >
    //                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //                         <LockOutlinedIcon />
    //                     </Avatar>
    //                     <Typography component="h1" variant="h5">
    //                         Đăng nhập
    //                     </Typography>
    //                     <Box
    //                         component="form"
    //                         noValidate
    //                         onSubmit={handleSubmit(submit)}
    //                         sx={{ mt: 1, width: '100%' }}
    //                     >
    //                         <TextField
    //                             margin="normal"
    //                             required
    //                             fullWidth
    //                             id="email"
    //                             type="email"
    //                             label="Email "
    //                             autoComplete="email"
    //                             autoFocus
    //                             {...register('email', {
    //                                 required: 'Please enter your email.',
    //                                 pattern: {
    //                                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //                                     message: 'invalid email address',
    //                                 },
    //                             })}
    //                         />
    //                         {errors.email && (
    //                             <p style={{ color: 'red', margin: 3 }}>{errors.email.message}</p>
    //                         )}

    //                         <TextField
    //                             margin="normal"
    //                             required
    //                             fullWidth
    //                             label="Mật khẩu"
    //                             type="password"
    //                             id="password"
    //                             autoComplete="current-password"
    //                             {...register('password', {
    //                                 required: 'Please enter your password.',
    //                             })}
    //                         />
    //                         {errors.password && (
    //                             <p style={{ color: 'red', margin: 3 }}>{errors.password.message}</p>
    //                         )}

    //                         <FormControlLabel
    //                             control={<Checkbox value="remember" color="primary" />}
    //                             label="Ghi nhớ đăng nhập"
    //                         />
    //                         <Button
    //                             type="submit"
    //                             fullWidth
    //                             variant="contained"
    //                             sx={{ mt: 3, mb: 2 }}
    //                         >
    //                             Đăng nhập
    //                         </Button>
    //                         <Grid container>
    //                             <Grid item xs>
    //                                 <Link href="/forgot-password" variant="body2">
    //                                     {'Quên mật khẩu ?'}
    //                                 </Link>
    //                             </Grid>
    //                             <Grid item>
    //                             Chưa có tài khoản? 
    //                                 <Link href="/register" variant="body2">
    //                                     {' Đăng ký ngay'}
    //                                 </Link>
    //                             </Grid>
    //                         </Grid>
    //                         {/*<Copyright sx={{ mt: 5 }} />*/}
    //                     </Box>
    //                 </Box>
    //             </Grid>
    //         </Grid>
    //     </ThemeProvider>
    // );
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#F9FAFC' }}>
                <CssBaseline />
                {/* Left side - Login Form */}
                <Grid item xs={12} sm={6} md={5} container alignItems="center" justifyContent="center">
                    <Box sx={{ px: 4, width: '100%', maxWidth: '400px' }}>
                        {/* Title */}
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Chào mừng !
                        </Typography>
                        <Typography variant="body1" color="textSecondary" >
                            Chúng tôi rất vui khi có bạn trở lại
                        </Typography>

                        {/* Login Form */}
                        <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email hoặc số điện thoại"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                {...register('email', {
                                    required: 'Email không được bỏ trống.',
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
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register('password', {
                                    required: 'Please enter your password.',
                                })}
                            />
                            {errors.password && (
                                <p style={{ color: 'red', margin: 3 }}>{errors.password.message}</p>
                            )}

                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Ghi nhớ đăng nhập"
                                    />
                                </Grid>
                                <Grid item>
                                    <Link href="/forgot-password" variant="body2" color="textSecondary">
                                        Quên mật khẩu ?
                                    </Link>
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2, padding: '10px 0', backgroundColor: '#1A237E', color: '#fff' , borderRadius:'20px'}}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{  mb: 1, padding: '10px 0', backgroundColor: '#1A237E', color: '#fff' , borderRadius:'20px'}}
                                onClick={() => navigate('/')}
                            >
                                Trang chủ
                            </Button>

                            <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
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

                {/* Right side - Illustration and Register Link */}
                <Grid item xs={false} sm={6} md={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <img src={login} alt="Login" style={{ maxWidth: '500px', borderRadius:'20px', width:'350px', height:'300px' }} />
                        <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, mb:1 }}>
                            Không có tài khoản?
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                            Bắt đầu bằng cách tạo tài khoản mới của bạn
                        </Typography>
                        <Button href="/register" variant="outlined" sx={{ px: 4, borderColor: '#1A237E', color: '#1A237E' }}>
                            Đăng ký
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

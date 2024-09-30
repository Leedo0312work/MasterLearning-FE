import forgotImage from '~/assets/images/forgot.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import { forgotPassword } from '~/services/auth';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box, Input, Paper, TextField, Typography } from '@mui/material';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleForgotPassword();
        }
    };

    const handleForgotPassword = async () => {
        setError('');
        if (email.length === 0) {
            setError('Không được để trống email.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Email không đúng định dạng');
            return;
        }
        const res = await forgotPassword(email);
        if (res && res.status === 200) {
            toast.success('Đã gửi email xác nhận. Vui lòng kiểm tra hộp thư.');
            navigate(`/check-email-noti?email=${encodeURIComponent(email)}`);
        } else {
            const errorMessage = res?.data?.message || 'Đã xảy ra lỗi';
            toast.error(errorMessage);
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #e0f7fa, #0066ff)',
            }}
        >
            <ToastContainer />
            <Paper
                elevation={6}
                style={{
                    padding: '2rem',
                    borderRadius: '12px',
                    maxWidth: '600px',
                    textAlign: 'center',
                }}
            >
                {/* Illustration */}
                <img
                    src={forgotImage}
                    alt="Forgot Password Illustration"
                    style={{ width: '200px', marginBottom: '20px' }}
                />

                {/* Title */}
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Quên mật khẩu
                </Typography>

                {/* Subtitle */}
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Đừng lo lắng! Hãy nhập địa chỉ email liên kết xác thực.
                </Typography>

                {/* Email Input */}
                <Box mt={2} mb={2}>
                    <TextField
                        label="Email Address"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                    />
                </Box>

                {/* Submit Button */}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        mb: 1,
                        padding: '10px 0',
                        backgroundColor: '#1A237E',
                        color: '#fff',
                        borderRadius: '20px',
                    }}
                    onClick={handleForgotPassword}
                >
                    Gửi
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        mb: 1,
                        padding: '10px 0',
                        backgroundColor: '#1A237E',
                        color: '#fff',
                        borderRadius: '20px',
                    }}
                    onClick={() => navigate('/login')}
                >
                    Đăng nhập
                </Button>
            </Paper>
        </div>
    );
}

export default ForgotPassword;

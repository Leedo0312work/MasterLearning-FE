import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
// @ts-ignore
import CheckNoti from '~/assets/images/check.jpg';

function CheckEmailNoti() {
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email') || 'example@gmail.com';
    const navigate = useNavigate();

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #e0f7fa, #0066ff)' }}>
            <Paper elevation={6} style={{ padding: '2rem', borderRadius: '12px', maxWidth: '600px', textAlign: 'center' }}>
                
                {/* Illustration */}
                <img src={CheckNoti} alt="Check Email Illustration" style={{ width: '200px', marginBottom: '20px' }} />
                
                {/* Title */}
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Kiểm tra email của bạn
                </Typography>

                {/* Instruction Text */}
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Chúng tôi đã gửi một email đến địa chỉ đã đăng ký của bạn
                </Typography>

                <Typography variant="body1" fontWeight="bold" gutterBottom>
                    {email}
                </Typography>

                <Typography variant="body2" color="textSecondary">
                    Vui lòng kiểm tra hộp thư đến hoặc thư mục thư rác và nhấp vào nút để xác minh email của bạn.                </Typography>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#0066ff',
                        color: '#fff',
                        padding: '10px 0',
                        width: '100%',
                        textTransform: 'none',
                        marginTop:'10px'
                    }}
                    onClick={() => navigate(`/login`)}
                >
                    Trở về đăng nhập
                </Button>
            </Paper>
        </div>
    );
}

export default CheckEmailNoti;

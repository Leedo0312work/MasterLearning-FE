import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

import { forgotPassword } from '~/services/auth';
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Input, TextField } from '@mui/material';


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigateTo = useNavigate();

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            handleForgotPassword()
        }
    };

    const handleForgotPassword = async () => {
        if (email.length === 0) {
            toast.error("Không được để trống email");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Email không đúng định dạng");
            return;
        }
        const res = await forgotPassword(email);
        if (res && res.status === 200) {
            navigateTo("/forgot-password-success");
        } else {
            const errorMessage = res?.data?.message;
            toast.error(errorMessage);
        }
    }

    return (
        <div className="flex w-full h-full justify-content-center items-center ">
            <div className="container mx-auto p-3">
                <div className="flex flex-row">
                    <div className="hidden lg:block lg:w-6/12">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>

                    <div className="w-full lg:w-4/12 p-8 flex rounded-3xl justify-center items-center flex-col"
                    style={{backgroundColor: "#ffffff", height: "300px"}}>
                        
                        <div className="mb-1 w-full">
                            <TextField
                                // size='lg'
                                value={email}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                label='Email'
                            />
                        </div>

                        <Button
                            className="btn mb-4 mt-3 font-bold focus:outline-none"
                            onKeyDown={handleKeyPress}
                            onClick={handleForgotPassword}
                            style={{
                                backgroundColor: "#6c7ee1",
                                width: "80%",
                            }}
                            type="button"
                            // size='sm'
                        >
                            Quên mật khẩu
                        </Button>

                        <div className='text-lg'>Chưa có tài khoản? <Link to='/register'>Đăng ký</Link> </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
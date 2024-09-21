import { LoginForm } from '~/types/login';
import API from '~/network/API';
import { RegisterForm } from '~/types/register';
import axiosIns from "./axios";

export const fetchLogin = async (data: LoginForm) => {
    const response = await axiosIns.post("/users/login", data);

        if (response && response.data) {
            const { accessToken, refreshToken } = response.data.result;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            // await userServices.getMe();

            return response;
}
};

export const fetchRegister = async (data: RegisterForm) => {
    try {
        const response = axiosIns.post("/users/register", data);
         return response;
    } catch (error) {
        throw error; 
    }
};




// import axiosIns from "./axios";
// import Cookies from "js-cookie";
// import { ToastContainer, toast } from "react-toastify";
// import { RegisterForm } from '~/types/register';
// import { LoginForm } from '~/types/login';

// // import userServices from "./userServices";

// class AuthServices {
//     async login(data: LoginForm) {
//         const response = await axiosIns.post("/users/login", data);

//         if (response && response.data) {
//             const { accessToken, refreshToken } = response.data.result;
//             localStorage.setItem("accessToken", accessToken);
//             localStorage.setItem("refreshToken", refreshToken);
    
//             // await userServices.getMe();
    
//             return response;
//         }
//     }

//     async register(data: RegisterForm) {
//         const response = axiosIns.post("/users/register", data);
//         return response;
//     }
//     async logout() {
//         await axiosIns.post("/users/logout", {
//             refreshToken: localStorage.getItem("refreshToken"),
//         });
//         localStorage.setItem("accessToken", "");
//         localStorage.setItem("refreshToken", "");
//         localStorage.setItem("user", "");
//     }

//     async forgotPassword(email:string) {
//         const response = axiosIns.post("/users/forgot-password", { email });
//         return response;
//     }
// }

// const authServices = new AuthServices();
// export default authServices;

import { LoginForm, LoginResponse } from '~/types/login';
import { ResponseAPI } from '~/app/response';
import { fetchLogin, fetchRegister, fetchResertPassword } from '~/services/auth';
import { RegisterForm, RegisterResponse } from '~/types/register';
import { ResetForm } from '~/types/reset';

export const getLogin = async (data: LoginForm): Promise<ResponseAPI<LoginResponse>> => {
    const response = await fetchLogin(data);
    if (response && response.data) {
        return response.data;
    }
    return response?.data;
};
export const getRegister = async (data: RegisterForm): Promise<ResponseAPI<RegisterResponse>> => {
    const response = await fetchRegister(data);
    if (response && response.data) {
        return response.data;
    }
    return response?.data;
};
export const resetPassword = async (data: ResetForm): Promise<ResponseAPI<RegisterResponse>> => {
    const response = await fetchResertPassword(data);
    if (response && response.data) {
        return response.data;
    }
    return response?.data;
};
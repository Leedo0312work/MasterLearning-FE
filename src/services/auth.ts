import { LoginForm } from '~/types/login';
import API from '~/network/API';
import { RegisterForm } from '~/types/register';

export const fetchLogin = async (data: LoginForm) => {
    try {
        const response = await API.post('/users/login', data);
        return response; 
    } catch (error) {
        throw error;
    }
};

export const fetchRegister = async (data: RegisterForm) => {
    try {
        const response = await API.post('/users/register', data);
        return response;
    } catch (error) {
        throw error; 
    }
};

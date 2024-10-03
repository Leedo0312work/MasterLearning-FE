

import { LoginForm } from '~/types/login';
import API from '~/network/API';
import axiosIns from '~/services/axios';
import { RegisterForm, VerifyEmailRequest } from '~/types/register';
import { useSearchParams, useNavigate } from 'react-router-dom';
import UserServices from "~/services/user";
import { useEffect } from 'react';
import { ResetForm } from '~/types/reset';

export const fetchLogin = async (data: LoginForm) => {
    try {
      const response = await axiosIns.post('/users/login', data);
      if (response && response.data && response.data.result) {
        const { accessToken, refreshToken } = response.data.result;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        await UserServices.getMe();
        return response; 
      }
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

export const fetchResertPassword = async (data: ResetForm) => {
  try {
      const response = await API.post('/users/reset-password', data);
      return response;
  } catch (error) {
      throw error; 
  }
};

export const logout = async() =>  {
  await axiosIns.post("/users/logout", {
      refreshToken: localStorage.getItem("refreshToken"),
  });
  localStorage.setItem("accessToken", "");
  localStorage.setItem("refreshToken", "");
  localStorage.setItem("user", "");
}

export const forgotPassword = async(email:string) => {
  const response = axiosIns.post("/users/forgot-password", { email });
  return response;
}



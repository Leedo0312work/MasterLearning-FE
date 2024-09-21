import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { JwtPayload } from "jwt-decode";
import * as jwtDecode from "jwt-decode";
import { message } from "antd";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3030";
//const BASE_URL = "https://1tbkgprl-3030.asse.devtunnels.ms/";

const axiosN = axios.create({
    baseURL: BASE_URL,
});

axiosN.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (config.headers) {
            config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
        }
        return config;
    },
    (error) => {
        // Xử lý lỗi request
        return Promise.reject(error);
    }
);

export const refreshTokenFunc = async (refreshToken: string): Promise<string | null> => {
    try {
        const res: AxiosResponse<{ result: { accessToken: string, refreshToken: string } }> = await axiosN.post("/users/refresh-token", { refreshToken });
        localStorage.setItem("accessToken", res.data.result.accessToken);
        localStorage.setItem("refreshToken", res.data.result.refreshToken);
        return res.data.result.accessToken;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const checkToken = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
        const decodedToken = jwtDecode<JwtPayload>(accessToken);
        const decodedRFToken = jwtDecode<JwtPayload>(refreshToken);
        const date = new Date();

        if (decodedRFToken.exp && decodedRFToken.exp < date.getTime() / 1000) {
            window.location.href = "/login?jwt=out";
        }

        if (decodedToken.exp && decodedToken.exp < date.getTime() / 1000) {
            await refreshTokenFunc(refreshToken);
        }

        return true;
    } else {
        window.location.href = "/login?jwt=out";
        return false;
    }
};

interface Callback {
    (res: AxiosResponse): void;
}

class Axios {
    async post<T>(url: string, data: T, callback?: Callback): Promise<AxiosResponse | null> {
        try {
            const res = await axiosN.post(url, data);
            if (res.status === 200 && typeof callback === "function") {
                callback(res);
            }
            return res;
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error occurred");
            return null;
        }
    }

    async postAuth<T>(url: string, data: T, callback?: Callback): Promise<AxiosResponse | null> {
        await checkToken();
        return this.post(url, data, callback);
    }

    async get(url: string, callback?: Callback): Promise<AxiosResponse | null> {
        try {
            const res = await axiosN.get(url);
            if (res.status === 200 && typeof callback === "function") {
                callback(res);
            }
            return res;
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error occurred");
            return null;
        }
    }

    async getAuth(url: string, callback?: Callback): Promise<AxiosResponse | null> {
        await checkToken();
        return this.get(url, callback);
    }
}

const axiosIns = new Axios();

export default axiosIns;

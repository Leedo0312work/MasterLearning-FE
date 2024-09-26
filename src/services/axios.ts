import axios from "axios";
import Cookies from "js-cookie";
import * as jwtDecode from "jwt-decode";
import { message } from "antd";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3030";
//const BASE_URL = "https://1tbkgprl-3030.asse.devtunnels.ms/";

const axiosN = axios.create({
    baseURL: BASE_URL,
});

axiosN.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "accessToken"
        )}`;
        return config;
    },
    (error) => {
        // Xử lý lỗi request
        return Promise.reject(error);
    }
);
export const refreshTokenFunc = async (refreshToken) => {
    try {
        const res = await axiosN.post("/users/refresh-token", { refreshToken });
        localStorage.setItem("accessToken", res.data.result.accessToken);
        localStorage.setItem("refreshToken", res.data.result.refreshToken);
        return res.data.result.accessToken;
    } catch (error) {
        console.log(error);
    }
};

const checkToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
        const decodedToken = jwtDecode.jwtDecode(accessToken);
        const decodedRFToken = jwtDecode.jwtDecode(refreshToken);
        let date = new Date();
        if (decodedRFToken.exp < date.getTime() / 1000) {
            window.location.href = "/login?jwt=out";
        }
        if (decodedToken.exp < date.getTime() / 1000) {
            await refreshTokenFunc(refreshToken);
        }
        return true;
    } else {
        window.location.href = "/login?jwt=out";
        return false;
    }
};

class Axios {
    async post(url, data, callback) {
        const response = await axiosN
            .post(url, data)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                return null;
            });
        return response;
    }

    async postAuth(url, data, callback) {
        await checkToken();
        const response = await axiosN
            .post(url, data)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                return null;
            });
        return response;
    }

    async get(url, callback) {
        const response = await axiosN
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                return null;
            });
        return response;
    }

    async getAuth(url, callback) {
        await checkToken();
        const response = await axiosN
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                return null;
            });
        return response;
    }
}

const axiosIns = new Axios();

export default axiosIns;

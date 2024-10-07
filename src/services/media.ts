import { toast } from "react-toastify";
import axiosIns from "./axios";
import { message, Spin } from "antd";
import { AxiosRequestConfig } from "axios";

class MediaServices {
    async uploadImage(file: any) {
        const formData = new FormData();

        if (Array.isArray(file)) {
            file.forEach((file) => {
                formData.append("image", file);
            });
        } else {
            formData.append("image", file);
        }

        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const response = await axiosIns.postAuth(
            "/medias/upload-image",
            formData,
            config
        );
        return response?.data;
    }

    async uploadVideoHLS(file: any) {
        const formData = new FormData();

        if (Array.isArray(file)) {
            file.forEach((file) => {
                formData.append("video", file);
            });
        } else {
            formData.append("video", file);
        }

        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const response = await axiosIns.postAuth(
            "/medias/upload-video-hls",
            formData,
            config
        );
        return response?.data;
    }

    async uploadVideo(file: any) {
        const formData = new FormData();

        if (Array.isArray(file)) {
            file.forEach((file) => {
                formData.append("video", file);
            });
        } else {
            formData.append("video", file);
        }

        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const response = await axiosIns.postAuth(
            "/medias/upload-video",
            formData,
            config
        );
        return response?.data;
    }
}

const mediaServices = new MediaServices();
export default mediaServices;

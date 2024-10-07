import axiosIns from "./axios";
import { message, Spin } from "antd";

export const fetchGetClassList = () => {
    return axiosIns.getAuth("/classes/");
}

export const fetchCreateClass = (data: any) => {
    return axiosIns.postAuth("/classes/create", data);
};

export const fetchRoles = () => {
    return axiosIns.get('/v1/classes/roles');
};

export const fetchDetailClass = (id: number) => {
    return axiosIns.getAuth(`/classes/${id}`);
};

export const fetchRole = (classId: number) => {
    return axiosIns.get(`/v1/classes/${classId}/role`);
};

export const fetchSearchClass = (code: string) => {
    return axiosIns.post("classes/search", code)
}

export const joinClass = async (class_id: string) => {
    return axiosIns.postAuth(`/classes/join-class`, {
        class_id: class_id,
    });
}

import { CreateClassForm } from '~/types/class';
import API from '~/network/API';
import axiosIns from './axios';

export const fetchGetAllClassList = () => {
    return API.get('/classes/get-all-class');
};

export const fetchGetClassList = () => {
    return API.get('/classes');
};

export const fetchCreateClass = (classes: CreateClassForm) => {
    return API.post('/classes/create', classes);
};

export const fetchRoles = () => {
    return API.get('/v1/classes/roles');
};

export const fetchDetailClass = (classId: number) => {
    return API.get(`/v1/classes/${classId}`);
};

export const fetchRole = (classId: number) => {
    return API.get(`/v1/classes/${classId}/role`);
};

export const fetchSearchClass = (code: string) => {
    return API.post('classes/find-by-code', {
        code: code,
    });
};

export const fetchGetAcceptedMember = (classId: string) => {
    return API.post('classes/get-member-accept', {
        classId: classId,
    });
};

export const fetchGetPendingMember = (classId: string) => {
    return API.post('classes/get-member-pending', {
        classId: classId,
    });
};

export const fetchAcceptMember = (id: string) => {
    return API.post('classes/accept-class', {
        id: id,
    });
};

export const fetchGetClassById = (id: string) => {
    return API.get(`classes/get/${id}`);
};

export const fetchDeleteClass = (classes_id: any) => {
    return API.post(`classes/delete`, {classes_id});
};

export const fetchAdminDeleteClass = (classes_id: any) => {
    return axiosIns.postAuth('/classes/delete-admin', {
        classes_id: classes_id,
    });
};

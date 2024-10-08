import { CreateClassForm } from '~/types/class';
import API from '~/network/API';

export const fetchGetClassList = () => {
    return API.get('/classes')
}

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
    return API.post("classes/find-by-code", {
        "code": code
    })
}
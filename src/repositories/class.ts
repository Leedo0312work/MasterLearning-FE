import { ResponseAPI } from '~/app/response';
import { fetchAcceptMember, fetchCreateClass, fetchDetailClass, fetchGetAcceptedMember, fetchGetClassList, fetchGetPendingMember, fetchRole, fetchRoles, fetchSearchClass } from '~/services/class';
import { CreateClassForm, GetRoleResponse } from '~/types/class';
import { IClass } from '~/models/IClass';
import { Role } from '~/enums/role';

export const getClassList = async () => {
    const response = await fetchGetClassList()
    console.log("Danh sách lớp:" , response)
    return response.data.result
}

export const getCreate = async (data: CreateClassForm): Promise<ResponseAPI> => {
    const response = await fetchCreateClass(data);
    return response?.data;
};

export const getRoles = async (): Promise<GetRoleResponse> => {
    const response = await fetchRoles();
    return response?.data.data;
};

export const getDetailClass = async (classId: number): Promise<IClass> => {
    const response = await fetchDetailClass(classId);
    return response?.data.data;
};

export const getRole = async (classId: number): Promise<Role> => {
    const response = await fetchRole(classId);
    return response?.data.data;
};

export const getSearch = async (code: string) => {
    const response = await fetchSearchClass(code)
    return response.data
}

export const getAcceptedMember = async (classId: string) => {
    const response = await fetchGetAcceptedMember(classId)
    return response.data.result
}

export const getPendingMember = async (classId: string) => {
    const response = await fetchGetPendingMember(classId)
    return response.data.result
}

export const getAccept = async (id: string) => {
    const response = await fetchAcceptMember(id)
    return response.data
}
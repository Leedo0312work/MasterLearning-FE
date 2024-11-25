import API from '~/network/API';

export const fetchGetListAccount = (limit:any, page:any) => {
    return API.get(`/users/get-all?limit=${limit}&page=${page}`);
};

export const fetchUpdateAccount = (data: any) => {
    return API.post(`/users/update`, data);
};

export const fetchBlockAccount = (user_id: string) => {
    return API.post(`/users/block-user`, user_id);
};



export interface CreateClassForm {
    type: string;
    name: string;
    description: string;
    topic: string;
    password: string;
}

export interface SearchClassForm {
    search: string;
    sort: string;
}

export interface GetRoleResponse {
    admin: number[];
    student: number[];
}

import axiosIns from "./axios";

export const fetchPostByClass = (page: number, limit: number, class_id: string) => {
    return axiosIns.getAuth(`/tweets?page=${page}&limit=${limit}&class_id=${class_id}`);
};


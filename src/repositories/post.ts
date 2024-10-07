import { ResponseAPI } from '~/app/response';
import { IPost } from '~/models/IPost';
import { fetchPostByClass } from '~/services/post';

export const getPostByClassId = async (class_id: string, page: number = 1, limit: number = 10): Promise<ResponseAPI<IPost[]>> => {
    const response = await fetchPostByClass(page, limit, class_id);
    return response?.data;
};


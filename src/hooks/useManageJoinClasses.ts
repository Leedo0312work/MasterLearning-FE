import { toast } from 'react-toastify';

import API from '~/network/API';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosIns from '~/services/axios';

export default function useManageJoinClasses() {
    const queryClient = useQueryClient();

    const { mutate: mutateJoin } = useMutation(
        'joinClass',
        async (data) => {
            const res = await API.post('/classes/join-class', data);
            console.log("hi", res)
            return res.data;
        },
        {
            onSuccess(data) {
                toast.success('Gửi yêu cầu tham gia lớp học thành công');
                queryClient.invalidateQueries(['classes']);
            },
            onError(err: any) {
                console.log(err);
                if (err.response?.status === 400) {
                    toast.error('Bạn đã gửi yêu câù vào lớp này rồi');
                } else if (err.response.status === 404) {
                    toast.error('Lớp học không tồn tại');
                }
            },
        },
    );

    return {
        mutateJoin,
    };
}
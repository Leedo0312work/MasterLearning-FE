import { toast } from 'react-toastify';

import API from '~/network/API';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosIns from '~/services/axios';
import { getClassById } from '~/repositories/class';

export default function useManageJoinClasses() {
    const queryClient = useQueryClient();

    const { mutate: mutateJoin } = useMutation(
        'joinClass',
        async (data) => {
            console.log("hi", data)
            const res = await API.post('/classes/join-class', data);
            
            return data;
        },
        {
            async onSuccess(data:any) {
                try {
                    const classId = data.classId; 
            
                    const classInfo = await getClassById(classId); // Sử dụng ID này
                    console.log("Class Info:", classInfo);

                    if (classInfo.type === 'Public' || classInfo.type === 'Security') {
                        toast.success('Tham gia lớp học thành công');
                    } else if (classInfo.type === 'Private') {
                        toast.success('Gửi yêu cầu tham gia lớp học thành công');
                    }

                    
                    queryClient.invalidateQueries(['classes']);
                } catch (error) {
                    console.error('Lỗi khi lấy thông tin lớp học:', error);
                    toast.error('Không thể lấy thông tin lớp học, vui lòng thử lại sau.');
                }
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
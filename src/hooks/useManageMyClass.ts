import { useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import API from '~/network/API';
import { STATUS } from '~/enums/class';
import { toast } from 'react-toastify';
import useDebounceFunction from '~/hooks/useDebounceFunction';
import dayjs from 'dayjs';
import { IClass } from '~/models/IClass';
import { getCreate } from '~/repositories/class';
import { ResponseAPI } from '~/app/response';
import { AxiosError } from 'axios';
import { CreateClassForm } from '~/types/class';

export default function useManageMyClass() {
    const [listData, setListData] = useState<IClass[]>([]);
    
    const originData = useRef<IClass[]>([]);
    const { data } = useQuery(
        'classes',
        async () => {
            const response = await API.get('/classes');
            console.log('API Response:', response);
            return response.data.result;
        },
        {
            onSuccess(response) {
                const validData = Array.isArray(response.data) ? response.data : [response];
                setListData(validData);
                originData.current = response.data;
            },
        },
    );

    const activeClass = useMemo(() => {
        if (!Boolean(listData) || !Array.isArray(listData)) return [];
            return Array.isArray(listData[0]) ? listData[0] : [];
    }, [listData]);

    const { mutate } = useMutation<ResponseAPI, AxiosError<ResponseAPI>, CreateClassForm>(
        'submit',
        async (classes) => getCreate(classes),
        {
            onMutate: async (newClass) => {
                setListData((prev) => {
                    if (Array.isArray(prev) && Array.isArray(prev[0])) {
                        return [[newClass, ...prev[0]], ...prev.slice(1)];
                    }
                    return prev;
                });
                toast.success('Thêm lớp học thành công');
            },
            onError(err) {
                console.log(err);
                if (err.response?.status === 409) {
                    toast.error('Lớp học đã tồn tại');
                } else {
                    toast.error('Thêm lớp học thất bại');
                }
            },
        }
    );
    


    const handleSearch = useDebounceFunction(({ search, sort }: { search: string; sort: string }) => {
        const origin = structuredClone(originData.current);
        if (!Array.isArray(origin)) return;

        const filter = origin?.filter((item) => item.name.toLowerCase().includes(search?.trim()?.toLowerCase()));

        if (sort === 'A-Z') {
            filter.sort((a, b) => a?.name?.localeCompare(b?.name));
        } else if (sort === 'Z-A') {
            filter.sort((a, b) => b?.name?.localeCompare(a?.name));
        } else if (sort === 'time_asc') {
            filter.sort((a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)));
        } else if (sort === 'time_desc') {
            filter.sort((a, b) => dayjs(a?.updatedAt).diff(dayjs(b?.updatedAt)));
        }

        setListData(filter);
    }, 500);

    return {
        listData,
        setListData,
        activeClass,
        mutate,
        handleSearch,
    };
}

import CardCourse from '~/components/CardCourse';
// @ts-ignore
import styles from './styles.module.css';
import ClassModalAddEdit from '~/components/ClassModalAddEdit';
import useModal from '~/hooks/useModal';
import ClassHeader from '~/components/ClassHeader';
import ClassContentHeader from '~/components/ClassContentHeader';
import useManageMyClass from '~/hooks/useManageMyClass';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { CreateClassForm, SearchClassForm } from '~/types/class';
import useManageJoinClasses from '~/hooks/useManageJoinClasses';
import ClassModalJoin from '~/components/ClassModalJoin';
import dayjs from 'dayjs';
import Member from '../Member';
import { useMutation } from 'react-query';
import { getDeleteClass } from '~/repositories/class';
import { toast } from 'react-toastify';

function Class() {
    const {
        isOpen: openAddModal,
        open: handleOpenAddModal,
        close: handleCloseAddModal,
    } = useModal();
    const {
        isOpen: openJoinModal,
        open: handleOpenJoinModal,
        close: handleCloseJoinModal,
    } = useModal();

    const { activeClass, mutate } = useManageMyClass();
    const [filteredClass, setFilteredClass] = useState<any>(activeClass);

    const handleSearch = ({ search, sort }: { search: string; sort: string }) => {
        function removeVietnameseDiacritics(str: string) {
            return str
                .normalize('NFD') // Tách các ký tự gốc và dấu
                .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
                .replace(/đ/g, 'd') // Thay đ thành d
                .replace(/Đ/g, 'D'); // Thay Đ thành D
        }

        const filter = activeClass.filter((item) =>
            removeVietnameseDiacritics(item.name.toLowerCase()).includes(
                removeVietnameseDiacritics(search.trim().toLowerCase()),
            ),
        );
        if (sort === 'A-Z') {
            filter.sort((a, b) => a?.name?.localeCompare(b?.name));
        } else if (sort === 'Z-A') {
            filter.sort((a, b) => b?.name?.localeCompare(a?.name));
        } else if (sort === 'time_asc') {
            filter.sort((a, b) => dayjs(b.updated_at).diff(dayjs(a.updated_at)));
        } else if (sort === 'time_desc') {
            filter.sort((a, b) => dayjs(a?.updated_at).diff(dayjs(b?.updated_at)));
        }

        setFilteredClass(filter);
    };

    const createClasses = (data: CreateClassForm) => {
        mutate(data);
    };

    const methods = useForm<SearchClassForm>({
        defaultValues: {
            search: '',
            sort: 'default',
        },
    });

    useEffect(() => {
        handleSearch({
            search: methods.watch('search'),
            sort: methods.watch('sort'),
        });
    }, [methods.watch('search'), methods.watch('sort'), activeClass]);

    const handleDelete = async (_id: string) => {
        try {
            await getDeleteClass(_id);

            setFilteredClass((prevClasses: any) =>
                prevClasses.filter((item: any) => item._id !== _id),
            );
            toast.success('Xoá lớp thành công');
        } catch (error) {
            console.error('Error deleting class:', error);
            toast.error('Xóa lớp thất bại');
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <ClassHeader handleOpenJoinModal={handleOpenJoinModal} />
                <FormProvider {...methods}>
                    <ClassContentHeader handleOpenAddModal={handleOpenAddModal} />
                </FormProvider>
            </div>
            <div className={styles.listClasses}>
                {filteredClass.map((item: any, index: any) => (
                    <CardCourse
                        key={item?._id}
                        _id={item?._id}
                        name={item?.name}
                        code={item?.code}
                        teacher={item?.teacher}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <ClassModalAddEdit
                subMitForm={createClasses}
                openAddModal={openAddModal}
                handleCloseAddModal={handleCloseAddModal}
                title="Thêm lớp học mới"
            />
            <ClassModalJoin
                openJoinModal={openJoinModal}
                handleCloseJoinModal={handleCloseJoinModal}
            />
        </div>
    );
}

export default Class;

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
        const filter = activeClass.filter((item) =>
            item.name.toLowerCase().includes(search.trim().toLowerCase()),
        );
        console.log('giá trị sort', sort);
        console.log('giá trị search', search);
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

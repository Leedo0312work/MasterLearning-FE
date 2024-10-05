import CardCourse from '~/components/CardCourse';

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
import useDebounceFunction from '~/hooks/useDebounceFunction';
import dayjs from 'dayjs';

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
    const { mutateJoin } = useManageJoinClasses();

    const { activeClass, mutate, handleSearch } = useManageMyClass();

    const createClasses = (data: CreateClassForm) => {
        mutate(data);
    };

    const methods = useForm<SearchClassForm>({
        defaultValues: {
            sort: 'default',
        },
    });

    useEffect(() => {
        const value = methods.watch('search');
        handleSearch({
            search: value,
            sort: methods.watch('sort'),
        });
    }, [methods.watch('search'), methods.watch('sort')]);

    // moi
    const handleJoinClass = (data: any) => {
        console.log(data);
        mutateJoin(data);
    };

    //console.log('filteredClass', filteredClass);

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <ClassHeader handleOpenJoinModal={handleOpenJoinModal} />
                <FormProvider {...methods}>
                    <ClassContentHeader handleOpenAddModal={handleOpenAddModal} />
                </FormProvider>

                {/* <ClassListHeading /> */}

                {/* <MyClass />  */}
            </div>
            {/* <div className={styles.listClasses}>
                {filteredClass.map((item: any, index: any) => (
                    <CardCourse
                        key={item?._id}
                        _id={item?._id}
                        name={item?.name}
                        code={item?.code}
                    />
                ))}
            </div> */}
            <ClassModalAddEdit
                subMitForm={createClasses}
                openAddModal={openAddModal}
                handleCloseAddModal={handleCloseAddModal}
                title="Thêm lớp học mới"
            />
            <ClassModalJoin
                subMitForm={handleJoinClass}
                openJoinModal={openJoinModal}
                handleCloseJoinModal={handleCloseJoinModal}
            />
        </div>
    );
}

export default Class;

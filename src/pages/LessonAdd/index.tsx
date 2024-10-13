import LessonHeader from '~/components/LessonHeader';
import SiderbarLessonAddEdit from '~/components/SiderbarLessonAddEdit';
import BoxInputLessonAdd from '~/components/BoxInputLessonAdd';

import styles from './styles.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';

function LessonAdd() {
    const methods = useForm<FormLessonType>({
        defaultValues: {
            name: '',
            description: '',
            class_id: '',
            type: 0,
            media: {
                type: 0,
                url: '',
            },
        },
    });

    return (
        <div className={styles.wrap}>
            <FormProvider {...methods}>
                <SiderbarLessonAddEdit />
            </FormProvider>
        </div>
    );
}

export default LessonAdd;

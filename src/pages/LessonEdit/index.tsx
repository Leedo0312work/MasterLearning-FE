import LessonHeader from '~/components/LessonHeader';
import SiderbarLessonAddEdit from '~/components/SiderbarLessonAddEdit';
import BoxInputLessonAdd from '~/components/BoxInputLessonAdd';

import styles from './styles.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getLessonById } from '~/repositories/lesson';

function LessonEdit() {
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

    const { lessonId } = useParams();

    const { data } = useQuery(['lesson', lessonId], async () => getLessonById(Number(lessonId)), {
        onSuccess(data) {
            methods.reset(data);
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

export default LessonEdit;

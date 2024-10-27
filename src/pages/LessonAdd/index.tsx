import LessonHeader from '~/components/LessonHeader';
import SiderbarLessonAddEdit from '~/components/SiderbarLessonAddEdit';
import BoxInputLessonAdd from '~/components/BoxInputLessonAdd';

import styles from './styles.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';
import { useState } from 'react';

function LessonAdd() {
    const [attachedMedias, setAttachedMedias] = useState<File[]>([]);

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
                <div className={styles.content}>
                    <div className={styles.box}>
                        <BoxInputLessonAdd
                            attachedMedias={attachedMedias}
                            setAttachedMedias={setAttachedMedias}
                        />
                    </div>
                </div>
                <SiderbarLessonAddEdit
                    attachedMedias={attachedMedias}
                    setAttachedMedias={setAttachedMedias}
                />
            </FormProvider>
        </div>
    );
}

export default LessonAdd;

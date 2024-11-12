import LessonHeader from '~/components/LessonHeader';
import SiderbarLessonAddEdit from '~/components/SiderbarLessonAddEdit';
import BoxInputLessonAdd from '~/components/BoxInputLessonAdd';

import styles from './styles.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLessonById } from '~/repositories/lesson';

function LessonAdd() {
    const { id: classId, lessonId } = useParams();
    const [attachedMedias, setAttachedMedias] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);


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

    const resetFileInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    useEffect(() => {
        const fetchLessonData = async () => {
            if (lessonId) {
                try {
                    const response = await getLessonById(lessonId);
                    const lessonData = response.result; 

                    console.log('lessonData: ', lessonData);

                    const mediaFiles = Array.isArray(lessonData.media)
                        ? lessonData.media.map((media: any) => ({
                              url: media.url,
                              type: media.type,
                          }))
                        : lessonData.media // nếu media là đối tượng, chuyển nó thành mảng
                        ? [{ url: lessonData.media.url, type: lessonData.media.type }]
                        : []; // nếu không có media, thiết lập mediaFiles là mảng rỗng

                    console.log('mediaFiles: ', mediaFiles);
                    methods.reset({
                        name: lessonData.name,
                        description: lessonData.description,
                        class_id: lessonData.class_id,
                        type: lessonData.type,
                        media: lessonData.media,
                    });
                    setAttachedMedias(mediaFiles);
                } catch (error) {
                    console.error('Error fetching lesson data:', error);
                }
            }
        };

        fetchLessonData();
    }, [lessonId, methods]);

    return (
        <div className={styles.wrap}>
            <FormProvider {...methods}>
                <div className={styles.content}>
                    <div className={styles.box}>
                        <BoxInputLessonAdd
                            attachedMedias={attachedMedias}
                            setAttachedMedias={setAttachedMedias}
                            onRemoveMedia={resetFileInput}
                        />
                    </div>
                </div>
                <SiderbarLessonAddEdit
                    attachedMedias={attachedMedias}
                    setAttachedMedias={setAttachedMedias}
                    inputRef={inputRef}
                />
            </FormProvider>
        </div>
    );
}

export default LessonAdd;

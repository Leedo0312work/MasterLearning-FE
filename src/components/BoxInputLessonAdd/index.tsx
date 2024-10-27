import TextField from '@mui/material/TextField';

import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function BoxInputLessonAdd({ attachedMedias }: { attachedMedias: File[] }) {
    const { control } = useFormContext<FormLessonType>();

    const { type } = useParams();

    return (
        <div className={styles.wrap}>
            <h6 className={styles.header}>
                {type === '1' ? 'Thông tin bài giảng' : 'Thông tin tài liệu'}
            </h6>

            <div className="listAttachedMedias">
                {attachedMedias.length > 0 &&
                    attachedMedias.map((file, index) => (
                        <div key={index}>
                            {file.type.startsWith('image/') || file.type.endsWith('pdf') ? (
                                <img src={URL.createObjectURL(file)} alt="media" />
                            ) : (
                                <video width="100%" controls>
                                    <source src={URL.createObjectURL(file)} type={file.type} />
                                </video>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default BoxInputLessonAdd;

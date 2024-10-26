import TextField from '@mui/material/TextField';

import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';
import { Controller } from 'react-hook-form';

function BoxInputLessonAdd({ attachedMedias }: { attachedMedias: File[] }) {
    const { control } = useFormContext<FormLessonType>();

    return (
        <div className={styles.wrap}>
            <h6 className={styles.header}>Thông tin bài giảng</h6>

            <div className="listAttachedMedias">
                {attachedMedias.length > 0 &&
                    attachedMedias.map((file, index) => (
                        <div key={index}>
                            {file.type.startsWith('image/') ? (
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

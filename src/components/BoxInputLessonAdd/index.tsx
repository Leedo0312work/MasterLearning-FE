import TextField from '@mui/material/TextField';

import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function BoxInputLessonAdd({
    attachedMedias,
    setAttachedMedias,
}: {
    attachedMedias: File[];
    setAttachedMedias: React.Dispatch<React.SetStateAction<File[]>>;
}) {
    const { control } = useFormContext<FormLessonType>();

    const { type } = useParams();

    const removeMedia = (index: number) => {
        setAttachedMedias(attachedMedias.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.wrap}>
            <h6 className={styles.header}>
                {type === '1' ? 'Thông tin bài giảng' : 'Thông tin tài liệu'}
            </h6>

            <div className="listAttachedMedias">
                {attachedMedias.length > 0 &&
                    attachedMedias.map((file, index) => (
                        <div key={index}>
                            {file.type.startsWith('image/') ? (
                                <img src={URL.createObjectURL(file)} alt="Image preview" />
                            ) : file.type.endsWith('pdf') ? (
                                <embed
                                    src={URL.createObjectURL(file)}
                                    type="application/pdf"
                                    width="100%"
                                    height="400px"
                                />
                            ) : (
                                <video width="100%" controls>
                                    <source src={URL.createObjectURL(file)} type={file.type} />
                                </video>
                            )}
                        </div>
                    ))}
                {attachedMedias.map((file, index) => (
                    <div key={index}>
                        {file.name}
                        <button onClick={() => removeMedia(index)}>Xóa</button>
                    </div>
                ))}
            </div>

            {/* <div>
                <div className={styles.listAttachedFile}>
                    {attachedFiles.length > 0 &&
                        attachedFiles.map((file, index) => (
                            <div key={index}>
                                <div className={styles.filename}>{file.name}</div>
                            </div>
                        ))}
                </div>
            </div> */}
        </div>
    );
}

export default BoxInputLessonAdd;

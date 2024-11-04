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
    attachedMedias: any[];
    setAttachedMedias: React.Dispatch<React.SetStateAction<any[]>>;
}) {
    const { control } = useFormContext<FormLessonType>();
    const { type } = useParams();

    const removeMedia = (index: number) => {
        setAttachedMedias(attachedMedias.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.wrap} style={{ width: '100%', height: '100%' }}>
            <h6 className={styles.header}>
                {type === '1' ? 'Thông tin bài giảng' : 'Thông tin tài liệu'}
            </h6>

            <div className="listAttachedMedias">
                {attachedMedias.length > 0 &&
                    attachedMedias.map((media, index) => (
                        <div key={index}>
                            {media.type === 3 ? (
                                <embed
                                    src={media.url}
                                    type="application/pdf"
                                    width="100%"
                                    height="500px"
                                />
                            ) : media.type === 2 ? (
                                <video width="100%" controls>
                                    <source src={media.url} type="video/mp4" />
                                </video>
                            ) : (
                                <img src={media.url} alt="Image preview" style={{ width: '100%' }} />
                            )}
                            <div>
                                <button onClick={() => removeMedia(index)}>Xóa</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default BoxInputLessonAdd;

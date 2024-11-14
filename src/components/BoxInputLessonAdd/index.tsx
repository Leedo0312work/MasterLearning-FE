import TextField from '@mui/material/TextField';
import styles from './styles.module.css';
import { useFormContext } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

function BoxInputLessonAdd({
    attachedMedias,
    setAttachedMedias,
    onRemoveMedia,
}: {
    attachedMedias: any[];
    setAttachedMedias: React.Dispatch<React.SetStateAction<any[]>>;
    onRemoveMedia: () => void;
}) {
    const { type } = useParams();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        // Tạo URL tạm thời cho chế độ xem
        if (attachedMedias.length > 0 && attachedMedias[0] instanceof File) {
            const file = attachedMedias[0];
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
        } else if (attachedMedias.length > 0) {
            // Sử dụng URL từ server (ở chế độ sửa)
            setPreviewUrl(attachedMedias[0].url); 
        }
    }, [attachedMedias]);

    const removeMedia = () => {
        setAttachedMedias([]);
        setPreviewUrl(null);
        onRemoveMedia();
    };

    return (
        <div className={styles.wrap} style={{ width: '100%', height: '100%' }}>
            <h6 className={styles.header}>
                {type === '1' ? 'Thông tin bài giảng' : 'Thông tin tài liệu'}
            </h6>

            <div className="listAttachedMedias">
            {previewUrl ? (
                <div className="listAttachedMedias">
                    {type === '1' ? (
                        <video width="100%" height="500px" controls>
                            <source src={previewUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <embed
                            src={previewUrl}
                            type="application/pdf"
                            width="100%"
                            height="500px"
                        />
                    )}
                    <div className={styles.btnRemove}>
                        <Button onClick={removeMedia} variant={'contained'}>
                            Xóa
                        </Button>
                    </div>
                    
                </div>
            ) : (
                <div className={styles.noti}><p>Chưa có file đính kèm</p></div>
            )}
            </div>
        </div>
    );
}

export default BoxInputLessonAdd;

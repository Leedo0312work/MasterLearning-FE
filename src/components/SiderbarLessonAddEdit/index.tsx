import { Button, TextareaAutosize, TextField } from '@mui/material';

import styles from './styles.module.css';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { useFormContext } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';
import { Controller } from 'react-hook-form';
import { getCreateLesson, getUpdateLesson } from '~/repositories/lesson';
import { useMutation } from 'react-query';
import useFolderStore from '~/store/useFolderStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import mediaServices from '~/services/media';
import BoxInputLessonAdd from '../BoxInputLessonAdd';

function SiderbarLessonAddEdit() {
    const { control, handleSubmit } = useFormContext<FormLessonType>();
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [attachedMedias, setAttachedMedias] = useState<File[]>([]);

    const { id: classId } = useParams();

    const navigate = useNavigate();

    const { mutate } = useMutation('create', (data: FormLessonType) => getCreateLesson(data), {
        onSuccess() {
            navigate(`/class/${classId}/lesson`);
        },
    });

    const { mutate: mutateEdit } = useMutation(
        'update',
        (data: FormLessonType) => getUpdateLesson(Number(data.id), data),
        {
            onSuccess() {
                navigate(`/class/${classId}/lesson`);
            },
        },
    );

    const submit = async (data: FormLessonType) => {
        let uploadedFiles: any[] = [];
        let uploadedMedia: { type: number; url: string } | null = null;

        try {
            if (attachedFiles.length > 0) {
                const pdfRes = await mediaServices.uploadPDF(attachedFiles);
                uploadedFiles = pdfRes.result;
            }

            if (attachedMedias.length > 0) {
                const images = attachedMedias.filter((file) => file.type.startsWith('image/'));
                const videos = attachedMedias.filter((file) => file.type.startsWith('video/'));

                if (images.length > 0) {
                    const imagesRes = await mediaServices.uploadImage(images);
                    uploadedMedia = { type: 0, url: imagesRes.result[0].url };
                }

                if (videos.length > 0) {
                    const videosRes = await mediaServices.uploadVideoHLS(videos);
                    uploadedMedia = { type: 3, url: videosRes[0].url };
                }
            }

            if (Boolean(data?.id)) {
                mutateEdit({
                    ...data,
                    class_id: classId as string,
                    media: uploadedMedia ? uploadedMedia : data.media,
                });
            } else {
                // Create new lesson
                mutate({
                    ...data,
                    class_id: classId as string,
                    media: uploadedMedia,
                });
            }
        } catch (error) {
            console.error('Error uploading files: ', error);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', padding: '5px' }}>
            <div style={{ height: '90%', display: 'flex', justifyContent: 'space-around' }}>
                <div
                    style={{
                        flexBasis: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className={styles.item}>
                        <div className={styles.name}>Tên bài giảng</div>
                        <div className={styles.input}>
                            <Controller
                                rules={{
                                    required: 'Tên không được để trống',
                                }}
                                control={control}
                                name={'name'}
                                render={({ field, fieldState: { error, invalid } }) => (
                                    <TextField
                                        error={invalid}
                                        helperText={error?.message}
                                        {...field}
                                        style={{
                                            width: '100%',
                                        }}
                                        InputProps={{
                                            style: {
                                                height: 38,
                                                border: 'none',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.name}>Mô tả</div>
                        <div className={styles.input}>
                            <Controller
                                control={control}
                                name={'description'}
                                render={({ field }) => (
                                    <TextareaAutosize
                                        {...field}
                                        className={styles.aria}
                                        aria-label="empty textarea"
                                        minRows={6}
                                        style={{ width: '100%' }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.name}>Bài tập đính kèm</div>
                        <div
                            className={styles.button}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <div className={styles.input}>
                                <FindInPageIcon />
                                <input
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    type="file"
                                    accept=".pdf"
                                    multiple
                                    onChange={(e) =>
                                        setAttachedFiles([
                                            ...attachedFiles,
                                            ...(e.target.files ? Array.from(e.target.files) : []),
                                        ])
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <div className={styles.listAttachedFile}>
                                {attachedFiles.length > 0 &&
                                    attachedFiles.map((file, index) => (
                                        <div key={index}>
                                            <div className={styles.filename}>{file.name}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={styles.item}
                    style={{
                        flexBasis: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <div className={styles.box} style={{ width: '100%', marginBottom: '30px' }}>
                        <BoxInputLessonAdd />
                    </div>
                    <div className={styles.name}>Bài giảng đính kèm</div>
                    <div className={styles.button}>
                        <div className={styles.input}>
                            <FindInPageIcon />
                            <input
                                style={{
                                    cursor: 'pointer',
                                }}
                                type="file"
                                accept="image/*, video/*"
                                multiple
                                onChange={(e) =>
                                    setAttachedMedias([
                                        ...attachedMedias,
                                        ...(e.target.files ? Array.from(e.target.files) : []),
                                    ])
                                }
                            />
                        </div>
                    </div>
                    <div className="listAttachedMedias">
                        {attachedMedias.length > 0 &&
                            attachedMedias.map((file, index) => (
                                <div key={index}>
                                    {file.type.startsWith('image/') ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="media"
                                            style={{ width: '100px' }}
                                        />
                                    ) : (
                                        <video width="100%" controls>
                                            <source
                                                src={URL.createObjectURL(file)}
                                                type={file.type}
                                            />
                                        </video>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className={styles.btnsubhmit} style={{ height: '10%' }}>
                <Button onClick={handleSubmit(submit)} fullWidth variant={'contained'}>
                    Hoàn tất
                </Button>
            </div>
        </div>
    );
}

export default SiderbarLessonAddEdit;

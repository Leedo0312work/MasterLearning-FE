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

function SiderbarLessonAddEdit({
    attachedMedias,
    setAttachedMedias,
}: {
    attachedMedias: File[];
    setAttachedMedias: React.Dispatch<React.SetStateAction<File[]>>;
}) {
    const { control, handleSubmit } = useFormContext<FormLessonType>();
    const { id: classId, type } = useParams();
    const navigate = useNavigate();

    const { mutate } = useMutation('create', (data: FormLessonType) => getCreateLesson(data), {
        onSuccess() {
            navigate(`/class/${classId}/content/${type}`);
        },
    });

    const { mutate: mutateEdit } = useMutation(
        'update',
        (data: FormLessonType) => getUpdateLesson(Number(data.id), data),
        {
            onSuccess() {
                navigate(`/class/${classId}/content/${type}`);
            },
        },
    );

    const handleVideoUpload = async () => {
        if (attachedMedias.length === 0) return null;

        try {
            const uploadResponse = await mediaServices.uploadVideoHLS(attachedMedias);
            const uploadResult = uploadResponse?.result?.[0];

            if (!uploadResult) {
                throw new Error('No upload result found');
            }

            const uploadId = uploadResult.url.split('/').pop();
            let uploadStatus;
            do {
                uploadStatus = await mediaServices.getStatusUploadVideoHLS(uploadId);
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } while (uploadStatus.result !== 'Uploaded');

            return { type: uploadResult.type, url: uploadResult.url };
        } catch (error) {
            console.error('Video upload error:', error);
            return null;
        }
    };

    const handlePDFUpload = async () => {
        if (attachedMedias.length === 0) return null;
        try {
            const uploadResponse = await mediaServices.uploadPDF(attachedMedias);
            return uploadResponse?.result || [];
        } catch (error) {
            console.error('PDF upload error:', error);
            return [];
        }
    };

    const submit = async (data: FormLessonType) => {
        // let uploadedFiles: any[] = [];
        //let uploadedMedia: { type: number; url: string } | null = null;

        try {
            // if (attachedFiles.length > 0) {
            //     const pdfRes = await mediaServices.uploadPDF(attachedFiles);
            //     uploadedFiles = pdfRes.result;
            // }

            const uploadedMedia =
                type === '1' ? await handleVideoUpload() : await handlePDFUpload();

            const lessonData = {
                ...data,
                class_id: classId as string,
                media: uploadedMedia,
                type: parseInt(type as string),
            };

            if (Boolean(data?.id)) {
                mutateEdit(lessonData);
            } else {
                mutate(lessonData);
            }
        } catch (error) {
            console.error('Error uploading files: ', error);
        }
    };

    return (
        <div style={{ height: '100%', padding: '5px' }}>
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
                        <div className={styles.name}>
                            Tên {type === '1' ? 'bài giảng' : 'tài liệu'}
                        </div>
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
                        <div className={styles.name}>
                            {type === '1' ? 'Bài giảng đính kèm' : 'Tài liệu đính kèm'}
                        </div>
                        <div className={styles.button}>
                            <div className={styles.input}>
                                <FindInPageIcon
                                    style={{
                                        cursor: 'pointer',
                                        marginLeft: '25px',
                                    }}
                                />
                                <input
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    type="file"
                                    accept={type === '1' ? 'video/*' : 'application/pdf'}
                                    onChange={(e) =>
                                        setAttachedMedias([
                                            ...attachedMedias,
                                            ...(e.target.files ? Array.from(e.target.files) : []),
                                        ])
                                    }
                                />
                            </div>
                        </div>
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

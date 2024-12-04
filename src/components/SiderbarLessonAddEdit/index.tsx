import { Button, TextareaAutosize, TextField } from '@mui/material';

import styles from './styles.module.css';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { useFormContext } from 'react-hook-form';
import { FormLessonType } from '~/types/lesson';
import { Controller } from 'react-hook-form';
import { getCreateLesson, updateLesson } from '~/repositories/lesson';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import mediaServices from '~/services/media';
import BoxInputLessonAdd from '../BoxInputLessonAdd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { error } from 'console';

function SiderbarLessonAddEdit({
    attachedMedias,
    setAttachedMedias,
    inputRef,
}: {
    attachedMedias: File[];
    setAttachedMedias: React.Dispatch<React.SetStateAction<File[]>>;
    inputRef: any;
}) {
    const { control, handleSubmit } = useFormContext<FormLessonType>();
    const { id: classId, lessonId, type } = useParams();
    const navigate = useNavigate();

    const { mutate } = useMutation('create', (data: FormLessonType) => getCreateLesson(data), {
        onSuccess() {
            navigate(`/class/${classId}/content/${type}`);
        },
    });

    const { mutate: mutateEdit } = useMutation(
        'update',
        (data: FormLessonType) => {
            console.log('data edit: ', data);
            return updateLesson(lessonId as string, data);
        },
        {
            onSuccess() {
                navigate(`/class/${classId}/content/${type}`);
            },
        },
    );

    const handleMediaUpload = async () => {
        if (attachedMedias.length !== 1) return null;

        try {
            const file = attachedMedias[0];
            if (file instanceof File) {
                if (type === '1') {
                    const uploadResponse = await mediaServices.uploadVideoHLS([file]);
                    return uploadResponse?.result;
                } else {
                    const uploadResponse = await mediaServices.uploadPDF([file]);
                    return uploadResponse?.result;
                }
            } else {
                return attachedMedias[0];
            }
        } catch (error) {
            console.error('Upload error:', error);
            return null;
        }
    };

    const submit = async (data: FormLessonType) => {
        try {
            if (!data.name || !data.description) {
                toast.error('Vui lòng nhập đầy đủ tên và mô tả trước khi đăng.');
                return;
            }

            const uploadedMedia = attachedMedias.length > 0 ? await handleMediaUpload() : null;
            console.log('uploadedMedia: ', uploadedMedia);

            const lessonData = lessonId
                ? {
                      name: data.name,
                      id: lessonId as string,
                      media: uploadedMedia ? [uploadedMedia] : [],
                      description: data.description,
                  }
                : {
                      ...data,
                      class_id: classId as string,
                      media: uploadedMedia,
                      type: parseInt(type as string),
                  };

            if (lessonId) {
                mutateEdit(lessonData as FormLessonType, {
                    onSuccess: () => {
                        toast.success('Cập nhật bài học thành công!');
                        navigate(`/class/${classId}/content/${type}`);
                    },
                    onError: (error) => {
                        console.error(error);
                        toast.error('Lỗi khi cập nhật bài học.');
                    },
                });
            } else {
                mutate(lessonData as FormLessonType, {
                    onSuccess: () => {
                        toast.success('Đăng bài thành công, đợi kiểm duyệt.');
                        navigate(`/class/${classId}/content/${type}`);
                    },
                    onError: (error) => {
                        console.error(error);
                        toast.error('Lỗi khi đăng bài.');
                    },
                });
            }
        } catch (error) {
            console.error('Error uploading files: ', error);
            toast.error('Lỗi khi tải tệp lên.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (attachedMedias.length > 0) {
            alert('Bạn cần xóa file hiện tại trước khi upload file mới.');
            return;
        }
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length > 0) {
            setAttachedMedias(files);
        }
    };

    return (
        <>
            <ToastContainer />
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
                                        ref={inputRef}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        type="file"
                                        accept={type === '1' ? 'video/*' : 'application/pdf'}
                                        onChange={handleFileChange}
                                        disabled={attachedMedias.length > 0}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.btnsubhmit} style={{ height: '10%' }}>
                    <Button onClick={handleSubmit(submit)} fullWidth variant={'contained'}>
                        {lessonId ? 'Cập nhật' : 'Hoàn tất'}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default SiderbarLessonAddEdit;

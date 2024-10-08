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

function SiderbarLessonAddEdit() {
    const { control, handleSubmit } = useFormContext<FormLessonType>();
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [attachedMedias, setAttachedMedias] = useState<File[]>([]);

    const { id } = useParams();

    const { mutate } = useMutation('create', (data: FormLessonType) => getCreateLesson(data), {
        onSuccess() {
            navigate(`/class/${id}/lesson`);
        },
    });

    const { mutate: mutateEdit } = useMutation(
        'update',
        (data: FormLessonType) => getUpdateLesson(Number(data.id), data),
        {
            onSuccess() {
                navigate(`/class/${id}/lesson`);
            },
        },
    );

    const folderId = useFolderStore((state) => state.id);

    const navigate = useNavigate();

    const submit = async (data: FormLessonType) => {
        let uploadedFiles: any[] = [];
        let uploadedMedias: any[] = [];

        try {
            // Upload tài liệu PDF
            if (attachedFiles.length > 0) {
                const pdfRes = await mediaServices.uploadPDF(attachedFiles);
                uploadedFiles = pdfRes.result;
            }

            // Upload hình ảnh và video
            if (attachedMedias.length > 0) {
                const images = attachedMedias.filter((file) => file.type.startsWith('image/'));
                const videos = attachedMedias.filter((file) => file.type.startsWith('video/'));

                if (images.length > 0) {
                    const imagesRes = await mediaServices.uploadImage(images);
                    uploadedMedias = [...uploadedMedias, ...imagesRes.result];
                }

                if (videos.length > 0) {
                    const videosRes = await mediaServices.uploadVideoHLS(videos);
                    uploadedMedias = [...uploadedMedias, ...videosRes.map((res) => res.result[0])];
                }
            }

            // Sau khi upload thành công, thực hiện tạo hoặc cập nhật bài giảng
            if (Boolean(data?.id)) {
                mutateEdit({
                    ...data,
                    folderId: Number(folderId),
                    attachedFiles: uploadedFiles,
                    attachedMedias: uploadedMedias,
                });
            } else {
                mutate({
                    ...data,
                    folderId: Number(folderId),
                    attachedFiles: uploadedFiles,
                    attachedMedias: uploadedMedias,
                });
            }
        } catch (error) {
            console.error('Error uploading files: ', error);
        }
    };

    return (
        <div className={styles.wrap}>
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
                    <div
                        className={styles.input}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
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
                <div className="listAttachedFile">
                    <div className="flex flex-wrap">
                        {attachedFiles.length > 0 &&
                            attachedFiles.map((file, index) => (
                                <div key={index}>
                                    <p>{file.name}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.name}>Bài giảng đính kèm</div>
                <div className={styles.button}>
                    <div
                        className={styles.input}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
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
                                    <video width="100px" controls>
                                        <source src={URL.createObjectURL(file)} type={file.type} />
                                    </video>
                                )}
                            </div>
                        ))}
                </div>
            </div>
            <div className={'tw-w-full'}>
                <Button onClick={handleSubmit(submit)} fullWidth variant={'contained'}>
                    Hoàn tất
                </Button>
            </div>
        </div>
    );
}

export default SiderbarLessonAddEdit;

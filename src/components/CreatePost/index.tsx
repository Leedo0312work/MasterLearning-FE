import styles from './styles.module.css';
import React, { useState } from "react";
import { Media } from "~/enums/media";
import {
    Avatar,
    Form,
    Modal,
    Input,
    Upload,
    Image,
    message,
    Tooltip,
    UploadFile,
} from "antd";
import { useSelector } from "react-redux";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { TweetType } from "~/enums/tweet";
import tweetServices from "~/services/tweet";
import mediaServices from "~/services/media";
import avatarDefault from '~/assets/images/avatar_default.png';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Box, Button } from '@mui/material';
import clsx from 'clsx';
import { memo } from 'react';

const CreatePost: React.FC<any> = ({ class_id, refetchPosts }) => {
    const [mediaList, setMediaList] = useState<UploadFile[]>([]);
    const [uploadMedia, setUploadMedia] = useState(false);
    const [content, setContent] = useState<string>("");

    const handleCancel = () => {
        setContent("");
        setMediaList([]);
        setUploadMedia(false);
    };

    const handleUploadChange = ({ fileList }: { fileList: any[] }) => {
        const updatedList = fileList.map((file) => {
            if (file.originFileObj) {
                return {
                    ...file,
                    thumbUrl: URL.createObjectURL(file.originFileObj),
                };
            }
            return file;
        });

        setMediaList((prev) =>
            Array.from(
                new Map(
                    [...prev, ...updatedList].map((item) => [
                        item.originFileObj?.name || item.uid,
                        item,
                    ])
                ).values()
            )
        );
    };

    const handleRemove = (file: UploadFile) => {
        if (file.thumbUrl) {
            URL.revokeObjectURL(file.thumbUrl);
        }
        const updatedList = mediaList.filter((item) => item.uid !== file.uid);
        setMediaList(updatedList);
    };

    const customIsImageUrl = (file: UploadFile) => {
        return (
            file?.type?.startsWith("image/") ||
            /\.(jpg|jpeg|png|gif)$/i.test(file.thumbUrl || "")
        );
    };

    const isImage = (file: any) => {
        const imageTypes = ["image/jpeg", "image/png", "image/gif"];
        return imageTypes.includes(file.type);
    };

    const itemRender = (originNode: React.ReactNode, file: UploadFile) => {
        if (isImage(file.originFileObj as any)) {
            return originNode;
        }
    };

    const handleCreate = async () => {
        if (!content) {
            message.error("Vui lòng nhập nội dung bài viết!");
            return;
        }
        const data = {
            class_id: class_id,
            content,
            medias: [] as Media[],
            type: TweetType.TWEET,
            parent_id: null,
            mentions: [],
        };

        if (uploadMedia) {
            const images = mediaList
                .filter((item) => isImage(item))
                .map((item) => item.originFileObj as File);
            const videos = mediaList
                .filter((item) => !isImage(item))
                .map((item) => item.originFileObj as File);

            if (images.length > 0 && videos.length > 0) {
                const [imagesRes, videosRes] = await Promise.all([
                    mediaServices.uploadImage(images),
                    Promise.all(
                        videos.map((video) =>
                            mediaServices.uploadVideoHLS(video)
                        )
                    ),
                ]);
                data.medias = [
                    ...imagesRes.result.map((item: any) => item),
                    ...videosRes.map((item: any) => item?.result[0]),
                ];
            } else if (images.length > 0 || videos.length === 0) {
                const imagesRes = await mediaServices.uploadImage(images);
                data.medias = imagesRes.result.map((item: any) => item);
            } else if (images.length === 0 && videos.length > 0) {
                const videosRes = await Promise.all(
                    videos.map((video) =>
                        mediaServices.uploadVideoHLS(video)
                    )
                );

                data.medias = videosRes.map((item: any) => item?.result[0]);
            }
        }

        const create = await tweetServices.createTweet(data);
        console.log(create);
        if (create && create.status === 200) {
            handleCancel();
            message.success("Tạo bài viết thành công!");
            refetchPosts();
        }
    };

    return (
        <div className={styles.wrap}>
            <Box className={styles.container} component="form">
                <div className={styles.header}>
                    <img
                        src={avatarDefault}
                        alt=""
                        className={'tw-h-12 tw-w-12 tw-rounded-full'}
                    />
                    <div className={styles.input}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Nhập nội dung thảo luận với lớp học..."
                            className={styles.text}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <Button
                        sx={{ fontSize: 14 }}
                        className={clsx(styles.button, styles.addImg)}
                        onClick={() => setUploadMedia(!uploadMedia)}
                    >
                        <Upload
                            multiple
                            listType="picture-card"
                            fileList={mediaList}
                            onChange={handleUploadChange}
                            itemRender={itemRender}
                            onRemove={handleRemove}
                            isImageUrl={customIsImageUrl}
                            beforeUpload={(file) => {
                                const isImageOrVideo =
                                    file.type.startsWith("image/") ||
                                    file.type.startsWith("video/");
                                if (!isImageOrVideo) {
                                    message.error(
                                        "Bạn chỉ có thể upload file ảnh hoặc video!"
                                    );
                                }
                                return false;
                            }}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Thêm hình</div>
                            </div>
                        </Upload>
                    </Button>
                    {/* {uploadMedia && (
                        <Upload
                            multiple
                            listType="picture-card"
                            fileList={mediaList}
                            onChange={handleUploadChange}
                            itemRender={itemRender}
                            onRemove={handleRemove}
                            isImageUrl={customIsImageUrl}
                            beforeUpload={(file) => {
                                const isImageOrVideo =
                                    file.type.startsWith("image/") ||
                                    file.type.startsWith("video/");
                                if (!isImageOrVideo) {
                                    message.error(
                                        "Bạn chỉ có thể upload file ảnh hoặc video!"
                                    );
                                }
                                return false;
                            }}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải ảnh/video</div>
                            </div>
                        </Upload>
                    )} */}
                    <Button
                        onClick={handleCreate}

                        sx={{ fontSize: 14 }}
                        className={clsx(styles.button, styles.post)}
                    >
                        Đăng tin
                    </Button>
                </div>
            </Box>
        </div>
    );
}

export default CreatePost;

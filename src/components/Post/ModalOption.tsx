import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import clsx from 'clsx';
import avatarDefault from '~/assets/images/avatar_default.png';
import { TweetType } from '~/enums/tweet';
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
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import tweetServices from '~/services/tweet';
import styles from './styles.module.css';
import mediaServices from "~/services/media";
import { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Box, Button } from '@mui/material';

const ModalOption = ({ postId, refetchPosts }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [mediaList, setMediaList] = useState<UploadFile[]>([]);
    const [uploadMedia, setUploadMedia] = useState(false);
    const [content, setContent] = useState<string>("");

    const handleCancel = () => {
        setContent("");
        setMediaList([]);
        setUploadMedia(false);
    };
    const handleEditClick = async () => {
        setIsEditModalOpen(true);
        await fetchTweet(postId);
    };
    const fetchTweet = async (postId: any) => {
        try {
            const response = await tweetServices.getTweet(postId);
            const tweetData = response.result;
            console.log(tweetData);
            // Set the retrieved content and media list.
            setContent(tweetData.content || "");
            setMediaList(
                tweetData.medias.map((media: any) => ({

                    url: media.url,
                    type: media.type,

                }))
            );
        } catch (error) {
            console.error('Error fetching tweet:', error);
        }
    };

    // Fetch tweet data when the edit modal opens.


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
        const fileType = typeof file?.type === 'string' ? file?.type : '';
        return (
            fileType.startsWith("image/") ||
            /\.(jpg|jpeg|png|gif)$/i.test(file.thumbUrl || "")
        );
    };


    const isImage = (file: any) => {
        // Check if file.type is a string before calling startsWith
        const fileType = typeof file?.type === 'string' ? file?.type : '';
        const imageTypes = ["image/jpeg", "image/png", "image/gif"];
        return fileType.startsWith("image/") || imageTypes.includes(fileType);
    };

    const itemRender = (originNode: React.ReactNode, file: UploadFile) => {
        if (isImage(file.originFileObj as any)) {
            return originNode;
        }
    };

    const handleEditPost = async () => {
        try {
            const data = {
                postId: postId,
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

            const updatedPost = await tweetServices.updateTweet(data, postId);
            if (updatedPost) {
                message.success("Cập nhật bài viết thành công!");
                refetchPosts();
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi chỉnh sửa bài viết.");

        } finally {
            setIsEditModalOpen(false)
        }
    };

    const handleDeletePost = async () => {
        try {
            const deletePost = await tweetServices.deleteTweet(postId);
            if (deletePost.message === 'Delete tweet suscess') {
                message.success("Xóa bài viết thành công!");
                refetchPosts();
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi xóa bài viết.");
        } finally {
            setIsModalOpen(false);
        }
    };


    return (
        <Menu as="div" className="tw-relative tw-inline-block tw-text-left">
            <div>
                <MenuButton className="tw-border-none tw-inline-flex tw-w-full tw-justify-center tw-gap-x-1.5 tw-bg-white tw-text-sm tw-font-semibold tw-text-gray-900">
                    <i className="tw-text-[20px] tw-ml-2 fa-solid fa-ellipsis-vertical"></i>
                </MenuButton>
            </div>

            <MenuItems className="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-56 tw-origin-top-right tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5">
                <div className="tw-py-1">
                    <MenuItem>
                        <a
                            href="#"
                            onClick={handleEditClick}
                            className="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:bg-gray-100"
                        >
                            Chỉnh sửa bài viết
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            onClick={() => setIsModalOpen(true)}
                            className="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:bg-gray-100"
                        >
                            Xóa bài viết
                        </a>
                    </MenuItem>
                </div>
            </MenuItems>
            {/* Confirmation Delete Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="tw-fixed tw-inset-0 tw-bg-black/30" aria-hidden="true">
                    <DialogBackdrop className="tw-fixed tw-inset-0 tw-bg-black/30" />
                </div>
                <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center">
                    <DialogPanel className="tw-w-full tw-max-w-sm tw-rounded tw-bg-white tw-p-6 tw-text-center">
                        <DialogTitle className="tw-text-lg tw-font-bold">Xóa bài viết</DialogTitle>
                        <p className="tw-mt-2 tw-text-sm tw-text-gray-500">
                            Bài viết sẽ bị xóa khỏi bảng tin. Bạn có chắc chắn muốn tiếp tục?
                        </p>
                        <div className="tw-mt-4 tw-flex tw-justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="tw-mr-2 tw-px-4 tw-py-2 tw-bg-gray-200 tw-rounded tw-text-sm"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDeletePost}
                                className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded tw-text-sm"
                            >
                                Đồng ý
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Edit Post Modal */}
            <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <div className="tw-fixed tw-inset-0 tw-bg-black/30" aria-hidden="true">
                    <DialogBackdrop className="tw-fixed tw-inset-0 tw-bg-black/30" />
                </div>
                <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center">
                    <DialogPanel className="tw-w-full tw-max-w-md tw-rounded tw-bg-white tw-p-6">
                        <DialogTitle className="tw-text-lg tw-font-bold">Chỉnh sửa bài viết</DialogTitle>
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
                                        Thêm hình
                                    </Button>
                                    {uploadMedia && (
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
                                    )}
                                    <Button
                                        onClick={handleEditPost}

                                        sx={{ fontSize: 14 }}
                                        className={clsx(styles.button, styles.post)}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </div>
                            </Box>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </Menu>
    );
};

export default ModalOption;

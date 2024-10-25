import React, { useState } from "react";
import { Media } from "~/enums/media";
import {
    Avatar,
    Button,
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
import { Button as Button2 } from "@material-tailwind/react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { TweetType } from "~/enums/tweet";
import tweetServices from "~/services/tweet";
import mediaServices from "~/services/media";

const { TextArea } = Input;

interface CreatePostModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    class_id: string;
    groupName: string;
}

interface MediaFile extends File {
    uid: string;
    thumbUrl?: string;
    originFileObj?: File;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, setOpen, class_id, groupName }) => {
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const [mediaList, setMediaList] = useState<UploadFile[]>([]);
    const [uploadMedia, setUploadMedia] = useState(false);
    const [content, setContent] = useState<string>("");

    const handleCancel = () => {
        setContent("");
        setMediaList([]);
        setUploadMedia(false);
        setOpen(false);
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
        if (create && create.status === 200) {
            handleCancel();
            message.success("Tạo bài viết thành công!");
        }
    };

    return (
        <Modal
            open={open}
            width={"90%"}
            style={{ maxWidth: "900px" }}
            onCancel={handleCancel}
            maskClosable={false}
            title={<p className="text-center">Tạo bài viết mới</p>}
            centered
            footer={
                <>
                    <Button onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button
                        className="ml-2 text-white bg-main"

                        onClick={handleCreate}
                    >
                        Tạo
                    </Button>
                </>
            }
        >
            <div className="px-3">
                <div className="flex mb-3 items-center">
                    <Avatar size={45} src={userInfo.avatar} />
                    <div className="leading-none ml-2 font-bold">
                        <p className="text-[16px]">{userInfo.name}</p>
                        <p className="font-semibold">{groupName}</p>
                    </div>
                </div>

                <TextArea
                    placeholder="Nhập nội dung bài viết..."
                    className="custom-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        border: "none",
                        fontSize: "16px",
                        outline: "none",
                        boxShadow: "none",
                    }}
                    autoSize={{ minRows: 3 }}
                />

                {uploadMedia && (
                    <Upload
                        multiple
                        listType="picture-card"
                        fileList={mediaList.filter((file: UploadFile) =>
                            file.type?.startsWith("image/")
                        )}
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
            </div>
        </Modal>
    );
};

export default CreatePostModal;

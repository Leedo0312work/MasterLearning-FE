import { Avatar, Image, Input, Upload, Button, message } from "antd";
const { TextArea } = Input;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import socket from "~/utils/socket";
import { TweetType } from "~/enums/tweet";
import tweetServices from "~/services/tweet";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import mediaServices from "~/services/media";

interface ControlCommentsProps {
    post: {
        _id: string;
        class_id: string;
        comment: number;
    };
    setListComment: React.Dispatch<React.SetStateAction<any[]>>;
}

interface FileItem {
    uid: string;
    name: string;
    status: string;
    thumbUrl?: string;
    type: string;
    originFileObj?: File;
}

const ControlComments: React.FC<any> = ({
    post,
    setListComment,
}) => {
    const [textComment, setTextComment] = useState<string>("");
    // const userInfo = useSelector((state: any) => state.user.userInfo);
    const userInfo = JSON.parse(localStorage.getItem('user') as string);

    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<boolean>(false);
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            socket.auth = {
                access_token: localStorage.getItem("accessToken") as string,
            };
            socket.connect();
            socket.emit("joinRoomComment", post._id);
            socket.on("commentUpdated", (comment: any) => {
                post.comment++;
                setListComment((prev: any[]) => [...prev, comment]);
                console.log(comment);
            });
            socket.on("disconnect", () => {
                //console.log("socket disconnected");
            });
            socket.on("connect_error", (err: any) => {
                console.log(err);
            });
            return () => {
                socket.emit("leaveRoomComment", post._id);
                socket.disconnect();
            };
        } else {
            alert("Vui lòng đăng nhập để chat");
            window.location.href = "/";
        }

        return () => {
            socket.emit("leaveRoom", post._id);
        };
    }, [post._id, setListComment]);

    const isImage = (file: File) => {
        const imageTypes = ["image/jpeg", "image/png", "image/gif"];
        return imageTypes.includes(file.type);
    };

    const handlerSendComment = async () => {
        if (!textComment.trim() && fileList.length === 0) return;

        const data = {
            class_id: post.class_id,
            content: textComment.trim(),
            medias: [] as any[],
            type: TweetType.COMMENT,
            parent_id: post._id,
            mentions: [],
        };

        if (fileList.length > 0) {
            const file = fileList[0];
            let mediaRes;
            if (isImage(file.originFileObj as File)) {
                mediaRes = await mediaServices.uploadImage(file.originFileObj as any);
            } else {
                mediaRes = await mediaServices.uploadVideo(file.originFileObj as any);
            }
            data.medias = mediaRes.result.map((item: any) => item);
        }

        const create = await tweetServices.createTweet(data);
        if (create && create.status === 200) {
            setTextComment("");
            setFileList([]);
            socket.emit("newComment", post._id, { ...data, user: userInfo });
        }
    };

    const beforeUpload = (file: File) => {
        const isImageOrVideo = file.type.startsWith("image/") || file.type.startsWith("video/");
        if (!isImageOrVideo) {
            message.error("Chỉ cho phép upload file ảnh hoặc video!");
            return false;
        }
        return false;
    };

    const handleChange = ({ fileList }: { fileList: any }) => {
        if (fileList.length > 1) {
            fileList = [fileList[0]];
        }
        const updatedList = fileList.map((file: any) => {
            if (file.originFileObj) {
                return {
                    ...file,
                    thumbUrl: URL.createObjectURL(file.originFileObj),
                };
            }
            return file;
        });
        setFileList(updatedList);
    };

    const handleRemove = (file: any) => {
        if (file.thumbUrl) {
            URL.revokeObjectURL(file.thumbUrl);
        }

        const updatedList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedList);
    };

    return (
        <div className="tw-flex">
            <Avatar src={userInfo?.avatar} size={40} className="mr-1" />
            <div className="tw-relative tw-w-full tw-bg-[#eff2f5] tw-rounded-3xl">
                <TextArea
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                    autoSize={{ minRows: 1, maxRows: 100 }}
                    placeholder="Viết bình luận..."
                    className="tw-bg-[#eff2f5] tw-py-2 tw-pr-[100px]"
                />
                <div className="tw-flex tw-flex-wrap">
                    {fileList.map((file) => (
                        file.type.startsWith("video/") && (
                            <div key={file.uid} style={{ position: "relative", margin: "10px" }}>
                                <video width="200px" height="100px" controls>
                                    <source src={file.thumbUrl} type={file.type} />
                                    Your browser does not support the video tag.
                                </video>
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleRemove(file)}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.8)",
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                    }}
                                />
                            </div>
                        )
                    ))}
                </div>
                <Upload
                    listType="picture-card"
                    fileList={fileList.filter((file) => file.type.startsWith("image/"))}
                    onRemove={handleRemove}
                ></Upload>
                <div className="tw-absolute tw-bottom-11 tw-right-0">
                    <EmojiPicker
                        lazyLoadEmojis={true}
                        width={300}
                        height={300}
                        onEmojiClick={(e) => setTextComment((prev) => prev + e.emoji)}
                        searchDisabled
                        skinTonesDisabled
                        open={isOpenEmojiPicker}
                    />
                </div>
                <div className="tw-absolute tw-right-0 tw-top-1 tw-ml-2 media-comment tw-w-[100px] tw-px-3 tw-text-[20px]">
                    <div className="tw-flex tw-mt-[6px] tw-justify-end">
                        <i onClick={() => setIsOpenEmojiPicker(!isOpenEmojiPicker)} className="fa-regular fa-face-smile"></i>
                        <Upload
                            fileList={fileList}
                            beforeUpload={beforeUpload}
                            maxCount={1}
                            showUploadList={false}
                            onChange={handleChange}
                            accept="image/*,video/*"
                        >
                            <i className="tw-text-[19px] fa-regular fa-image tw-mx-2"></i>
                        </Upload>
                        <i
                            onClick={handlerSendComment}
                            className={`${textComment.trim() ? "text-main" : ""} fa-regular fa-paper-plane`}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlComments;

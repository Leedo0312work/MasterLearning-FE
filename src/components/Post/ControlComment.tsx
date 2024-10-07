import { Avatar, Image, Input, Upload, Button, message } from "antd";
const { TextArea } = Input;
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import socket from "@/utils/socket";
import { TweetType } from "@/constant/tweet";
import tweetServices from "../../../../services/tweetServices";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import mediaServices from "../../../../services/mediaServices";

const ControlComment = ({ post, setListComment }) => {
    const [textComment, setTextComment] = React.useState("");
    const userInfo = useSelector((state) => state.user.userInfo);
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = React.useState(false);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            socket.auth = {
                access_token: localStorage.getItem("accessToken"),
            };
            socket.connect();
            socket.emit("joinRoomComment", post._id);
            socket.on("commentUpdated", (comment) => {
                post.comment++;
                setListComment((pre) => [comment, ...pre]);
            });
            socket.on("disconnect", () => {
                //console.log("socket disconnected");
            });
            socket.on("connect_error", (err) => {
                console.log(err);
            });
            return () => {
                socket.emit("leaveRoomComment", post._id);
                socket.disconnect();
                //setIsConnectedSocket(false);
            };
        } else {
            alert("Vui lòng đăng nhập để chat");
            window.location.href = "/";
        }

        return () => {
            socket.emit("leaveRoom", post._id);
        };
    }, [post._id]);

    const isImage = (file) => {
        const imageTypes = ["image/jpeg", "image/png", "image/gif"];
        return imageTypes.includes(file.type);
    };
    const handlerSendComment = async () => {
        if (!textComment && fileList.length === 0) return;

        const data = {
            group_id: post.group_id,
            content: textComment.trim(),
            medias: [],
            type: TweetType.COMMENT,
            parent_id: post._id,
            mentions: [],
        };

        if (fileList && fileList.length > 0) {
            let mediaRes = {};
            if (isImage(fileList[0])) {
                mediaRes = await mediaServices.uploadImage(
                    fileList[0].originFileObj
                );
            } else {
                mediaRes = await mediaServices.uploadVideo(
                    fileList[0].originFileObj
                );
            }

            data.medias = [...mediaRes.result.map((item) => item)];
        }
        const create = await tweetServices.createTweet(data);
        if (create && create.status === 200) {
            setTextComment("");
            setFileList([]);
            socket.emit("newComment", post._id, { ...data, user: [userInfo] });
        }
    };

    const [fileList, setFileList] = useState([]);

    const beforeUpload = (file) => {
        const isImageOrVideo =
            file.type.startsWith("image/") || file.type.startsWith("video/");
        if (!isImageOrVideo) {
            message.error("Chỉ cho phép upload file ảnh hoặc video!");
            return false;
        }
        return false;
    };

    const handleChange = ({ fileList }) => {
        if (fileList.length > 1) {
            fileList = [fileList[0]];
        }
        const updatedList = fileList.map((file) => {
            if (file.originFileObj) {
                return {
                    ...file,
                    thumbUrl: URL.createObjectURL(file.originFileObj),
                };
            }
            return file;
        });
        setFileList(updatedList);
        console.log("fileList:", updatedList);
    };
    const handleRemove = (file) => {
        if (file.thumbUrl) {
            URL.revokeObjectURL(file.thumbUrl);
        }

        const updatedList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedList);
    };
    return (
        <div className="flex">
            <Avatar src={userInfo.avatar} size={40} className="mr-1" />
            <div className="relative w-full bg-[#eff2f5] rounded-3xl ">
                <TextArea
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                    autoSize={{ minRows: 1, maxRows: 100 }}
                    placeholder="Viết bình luận..."
                    className={`bg-[#eff2f5] py-2 pr-[100px] `}
                    variant="borderless"
                />
                <div className="flex flex-wrap">
                    {fileList.length > 0 &&
                        fileList.map((file) => {
                            if (file.type.startsWith("video/")) {
                                return (
                                    <div
                                        key={file.uid}
                                        style={{
                                            position: "relative",
                                            margin: "10px",
                                        }}
                                    >
                                        <video
                                            width="200px"
                                            height="100px"
                                            controls
                                        >
                                            <source
                                                src={file.thumbUrl}
                                                type={file.type}
                                            />
                                            Your browser does not support the
                                            video tag.
                                        </video>
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Button
                                                icon={<DeleteOutlined />}
                                                onClick={() =>
                                                    handleRemove(file)
                                                }
                                                style={{
                                                    background:
                                                        "rgba(255, 255, 255, 0.8)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            }
                        })}
                </div>
                <Upload
                    listType="picture-card"
                    fileList={fileList.filter((file) =>
                        file.type.startsWith("image/")
                    )}
                    onRemove={handleRemove}
                ></Upload>
                <div className="absolute bottom-11 right-0">
                    <EmojiPicker
                        lazyLoadEmojis={true}
                        width={300}
                        height={300}
                        onEmojiClick={(e) =>
                            setTextComment((prev) => prev + e.emoji)
                        }
                        searchDisabled
                        skinTonesDisabled
                        open={isOpenEmojiPicker}
                    />
                </div>
                <div className="absolute  right-0 top-1 ml-2 media-comment w-[100px]   px-3 text-[20px]">
                    <div className="flex mt-[6px] justify-end">
                        <i
                            onClick={() =>
                                setIsOpenEmojiPicker(!isOpenEmojiPicker)
                            }
                            className="fa-light  fa-face-smile"
                        ></i>

                        <Upload
                            fileList={fileList}
                            beforeUpload={beforeUpload}
                            maxCount={1}
                            showUploadList={false}
                            onChange={handleChange}
                            accept="image/*,video/*"
                            onRemove={handleRemove}
                        >
                            <i className="text-[19px] fa-light fa-image mx-2"></i>
                        </Upload>

                        <i
                            onClick={handlerSendComment}
                            className={`${textComment.length > 0 ? "text-main" : ""
                                } fa-duotone fa-paper-plane-top`}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

ControlComment.propTypes = {
    post: PropTypes.object.isRequired,
    setListComment: PropTypes.func.isRequired,
};

export default ControlComment;
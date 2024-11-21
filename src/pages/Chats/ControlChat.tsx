import { Avatar, Image, Input, Upload, Button, message } from 'antd';
const { TextArea } = Input;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EmojiPicker from 'emoji-picker-react';
import socket from '~/utils/socket';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

import mediaServices from '~/services/media';
import { useParams } from 'react-router-dom';
import conversationServices from '~/services/conversation';

const ControlChat = ({ setListChat }: any) => {
    const [textComment, setTextComment] = React.useState('');
    const userInfo = JSON.parse(localStorage.getItem('user') as string);
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = React.useState(false);
    const { id } = useParams();
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            socket.auth = {
                access_token: localStorage.getItem('accessToken'),
            };
            socket.connect();
            socket.emit('joinRoomChat', `chat-${id}`);
            socket.on('chatUpdated', (chat: any) => {
                setListChat((pre: any) => [chat, ...pre]);
            });
            socket.on('disconnect', () => {
                //console.log("socket disconnected");
            });
            socket.on('connect_error', (err: any) => {
                console.log(err);
            });
            return () => {
                socket.emit('leaveRoomChat', `chat-${id}`);
                socket.disconnect();
                //setIsConnectedSocket(false);
            };
        } else {
            alert('Vui lòng đăng nhập để chat');
            window.location.href = '/';
        }

        return () => {
            socket.emit('leaveRoomChat', `chat-${id}`);
        };
    }, [id]);

    const isImage = (file: any) => {
        const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        return imageTypes.includes(file.type);
    };
    const handlerSendChat = async () => {
        if (!textComment && fileList.length === 0) return;

        const data: any = {
            class_id: id,
            sender_id: userInfo._id,
            content: textComment.trim(),
            medias: [],
        };

        if (fileList && fileList.length > 0) {
            let mediaRes: any = {};
            if (isImage(fileList[0])) {
                mediaRes = await mediaServices.uploadImage(fileList[0].originFileObj);
            } else {
                mediaRes = await mediaServices.uploadVideo(fileList[0].originFileObj);
            }

            data.medias = [...mediaRes.result.map((item: any) => item)];
        }
        const create = await conversationServices.createChat(data);
        if (create && create.status === 200) {
            setTextComment('');
            setFileList([]);
            socket.emit('newChat', `chat-${id}`, { ...data, user: userInfo });
        }
    };

    const [fileList, setFileList] = useState<any>([]);

    const beforeUpload = (file: any) => {
        const isImageOrVideo = file.type.startsWith('image/') || file.type.startsWith('video/');
        if (!isImageOrVideo) {
            message.error('Chỉ cho phép upload file ảnh hoặc video!');
            return false;
        }
        return false;
    };

    const handleChange = ({ fileList }: any) => {
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
        console.log('fileList:', updatedList);
    };
    const handleRemove = (file: any) => {
        if (file.thumbUrl) {
            URL.revokeObjectURL(file.thumbUrl);
        }

        const updatedList = fileList.filter((item: any) => item.uid !== file.uid);
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
                    placeholder="Viết tin nhắn..."
                    className="tw-bg-[#eff2f5] tw-py-2 tw-pr-[100px]"
                />
                <div className="tw-flex tw-flex-wrap">
                    {fileList.map(
                        (file: any) =>
                            file.type.startsWith('video/') && (
                                <div
                                    key={file.uid}
                                    style={{ position: 'relative', margin: '10px' }}
                                >
                                    <video width="200px" height="100px" controls>
                                        <source src={file.thumbUrl} type={file.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleRemove(file)}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                        }}
                                    />
                                </div>
                            ),
                    )}
                </div>
                <Upload
                    listType="picture-card"
                    fileList={fileList.filter((file: any) => file.type.startsWith('image/'))}
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
                        <i
                            onClick={() => setIsOpenEmojiPicker((pre) => !pre)}
                            className="fa-regular fa-face-smile"
                        ></i>
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
                            onClick={handlerSendChat}
                            className={`${
                                textComment.trim() ? 'text-main' : ''
                            } fa-regular fa-paper-plane`}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlChat;

import React from 'react';
import { Avatar, Image } from 'antd';
import PropsType from 'prop-types';
import Video from '~/utils/media/video';
import { MediaType } from '~/enums/media';

const Chat = ({ isMe, chat }: any) => {
    return (
        <div
            className={`tw-inline-flex tw-px-5 tw-max-w-[50%] tw-lg:tw-max-w-[700px]  tw-py-1 tw-items-start ${
                isMe ? 'tw-bg-[#3e8bd7]' : 'tw-bg-[#eff2f5]'
            }  tw-my-1  tw-rounded-3xl`}
        >
            {!isMe && (
                <div className="tw-w-[35px]">
                    <Avatar src={chat.user.avatar} size={35} />
                </div>
            )}
            <div className="tw-text-[14px]  tw-mt-2">
                {!isMe && (
                    <div className="tw-leading-4">
                        <span className="tw-font-bold tw-flex-shrink-0 tw-mx-2">
                            {chat.user.name}
                        </span>
                        {chat.content}
                    </div>
                )}
                {isMe && <div className="tw-text-end tw-text-white">{chat.content}</div>}

                {chat.medias.length > 0 && chat.medias[0].type === MediaType.Image && (
                    <Image className="tw-mt-1" src={chat.medias[0].url} width={300}></Image>
                )}
                {chat.medias.length > 0 && chat.medias[0].type === MediaType.Video && (
                    <div className="tw-mt-1 tw-w-[300px]">
                        <Video src={chat.medias[0].url} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;

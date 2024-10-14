import React from "react";
import { Avatar, Image } from "antd";
import PropsType from "prop-types";
import { MediaType } from "~/enums/tweet";
import Video from "~/utils/media/video";

const Comment = ({ comment }: any) => {
    return (
        <div className="tw-flex tw-items-start tw-bg-[#eff2f5] tw-my-2 tw-p-1 tw-rounded-3xl">
            <div className="tw-w-[35px]">
                <Avatar src={comment.user?.avatar} size={35} />
            </div>
            <div className="tw-text-[14px] tw-max-w-[90%] tw-lg:max-w-[700px] tw-mt-2">
                <div className=" tw-leading-4">
                    <span className="tw-font-bold tw-flex-shrink-0 tw-mx-2">
                        {comment.user?.name}
                    </span>
                    {comment.content}
                </div>

                {comment.medias.length > 0 &&
                    comment.medias[0].type === MediaType.IMAGE && (
                        <Image
                            className="tw-mt-1"
                            src={comment.medias[0].url}
                            width={300}
                        ></Image>
                    )}
                {comment.medias.length > 0 &&
                    comment.medias[0].type === MediaType.VIDEO && (
                        <div className="tw-mt-1 tw-w-[300px]">
                            <Video src={comment.medias[0].url} />
                        </div>
                    )}

                <div className="tw-mx-2 tw-flex tw-font-bold tw-text-gray-600">
                    <p className="tw-mr-5">Thích</p>
                    <p>Trả lời</p>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropsType.object.isRequired,
};

export default Comment;
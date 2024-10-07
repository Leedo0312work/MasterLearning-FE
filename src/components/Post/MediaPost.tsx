import { Image } from "antd";
import React, { useEffect } from "react";
import SliderPost from "./SliderPost";
import PropTypes from "prop-types";

import VideoHLS from "~/utils/media/videoHLS";

const MediaPost = ({ post }: any) => {
    const [openSlider, setOpenSlider] = React.useState(false);
    const [mediasPost, setMediasPost] = React.useState([]);
    const { medias } = post;
    const mediaCount = medias.length;

    useEffect(() => {
        if (medias.length > 0) {
            setMediasPost(medias);
        }
    }, [medias]);

    const renderMedia = () => {
        if (!medias || medias.length === 0) return null;

        const mediaFiles = medias.slice(0, 4); // Limit to 4 files
        const remainingFilesCount = medias.length - 4; // Count of remaining files

        return (
            <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                {mediaFiles.map((media: any, index: any) => {
                    const isSingleInRow =
                        mediaFiles.length % 2 !== 0 &&
                        index === mediaFiles.length - 1;

                    return (
                        <div
                            key={index}
                            className={`tw-relative  ${isSingleInRow ? "tw-col-span-2" : ""
                                }`}
                        >
                            {media.type === 0 ? (
                                <div
                                    className={`${isSingleInRow
                                        ? "tw-h-[300px]"
                                        : "tw-h-[187px]"
                                        } tw-rounded-lg tw-overflow-hidden`}
                                >
                                    <Image
                                        src={media.url}
                                        alt={`Image ${index}`}
                                        height={
                                            isSingleInRow ? "300px" : "187px"
                                        }
                                        width={"100%"}
                                        style={{ objectFit: "cover" }}
                                        preview={true}
                                    />
                                </div>
                            ) : (
                                <VideoHLS
                                    src={media.url}
                                    controlType={
                                        mediaCount > 4 && index === 3
                                            ? "none"
                                            : "control"
                                    }
                                />
                            )}
                            {index === 3 && remainingFilesCount > 0 && (
                                <div
                                    onClick={() => setOpenSlider(true)}
                                    className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-[187px] tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50 tw-text-white tw-text-xl"
                                >
                                    +{remainingFilesCount}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            {renderMedia()}

            {/* <SliderPost
                media={mediasPost}
                open={openSlider}
                setOpen={setOpenSlider}
            /> */}
        </div>
    );
};

MediaPost.propTypes = {
    post: PropTypes.object.isRequired,
};

export default MediaPost;
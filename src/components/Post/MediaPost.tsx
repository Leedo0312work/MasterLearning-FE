import React, { useEffect, useState } from "react";
import { Image } from "antd";
import SliderPost from "./SliderPost";
import PropTypes from "prop-types";
import VideoHLS from "~/utils/media/videoHLS";

interface MediaItem {
    type: number;
    url: string;
}

interface MediaPostProps {
    post: {
        medias: MediaItem[];
    };
}

const MediaPost: React.FC<MediaPostProps> = ({ post }) => {
    const [openSlider, setOpenSlider] = useState(false);
    const [mediasPost, setMediasPost] = useState<MediaItem[]>([]);

    useEffect(() => {
        if (post.medias.length > 0) {
            setMediasPost(post.medias);
        }
    }, [post.medias]);

    const handleDeleteMedia = (index: number) => {
        const updatedMedias = mediasPost.filter((_, i) => i !== index);
        setMediasPost(updatedMedias);
        // Optionally make an API call to sync changes with the backend
    };

    const renderMedia = () => {
        if (!mediasPost || mediasPost.length === 0) return null;
        const mediaFiles = mediasPost.slice(0, 4); // Display up to 4 media items
        const remainingFilesCount = mediasPost.length - 4;

        return (
            <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                {mediaFiles.map((media, index) => {
                    const isSingleInRow =
                        mediaFiles.length % 2 !== 0 && index === mediaFiles.length - 1;

                    return (
                        <div
                            key={index}
                            className={`tw-relative ${isSingleInRow ? "tw-col-span-2" : ""}`}
                        >
                            {media.type === 0 ? (
                                <div
                                    className={`${isSingleInRow ? "tw-h-[300px]" : "tw-h-[187px]"} 
                  tw-rounded-lg tw-overflow-hidden`}
                                >
                                    <Image
                                        src={media.url}
                                        alt={`Media ${index}`}
                                        height={isSingleInRow ? "300px" : "187px"}
                                        width="100%"
                                        style={{ objectFit: "contain" }}
                                        preview
                                    />
                                    {/* Uncomment if delete functionality is needed */}
                                    {/* <div
                    onClick={() => handleDeleteMedia(index)}
                    className="tw-absolute tw-top-1 tw-right-1 tw-text-gray-500 tw-cursor-pointer"
                  >
                    <i className="fa-solid fa-circle-xmark tw-text-xl"></i>
                  </div> */}
                                </div>
                            ) : (
                                <VideoHLS src={media.url} />
                            )}
                            {index === 3 && remainingFilesCount > 0 && (
                                <div
                                    onClick={() => setOpenSlider(true)}
                                    className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-[187px] tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50 tw-text-white tw-text-xl tw-cursor-pointer"
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
            <SliderPost
                media={mediasPost}
                open={openSlider}
                setOpen={setOpenSlider}
            />
        </div>
    );
};

MediaPost.propTypes = {
    post: PropTypes.shape({
        medias: PropTypes.array.isRequired,
    }).isRequired,
};

export default MediaPost;

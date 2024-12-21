import React from "react";
import { Modal, Image, Carousel } from "antd";
import PropTypes from "prop-types";
import VideoHLS from "~/utils/media/videoHLS";

interface SliderPostProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    media: Array<{ type: number; url: string }>;
}

const SliderPost: React.FC<SliderPostProps> = ({ open, setOpen, media }) => {
    return (
        <Modal
            width="70%"
            style={{ top: 0 }}
            open={open}
            onCancel={() => setOpen(false)}
            centered
            footer={null}
        >
            <Carousel arrows infinite>
                {media.map((item, index) => (
                    <div key={index} className="max-h-[80vh]">
                        {item.type === 0 ? (
                            <Image width="100%" height="100%" src={item.url} />
                        ) : (
                            <VideoHLS src={item.url} />
                        )}
                    </div>
                ))}
            </Carousel>
        </Modal>
    );
};

SliderPost.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    media: PropTypes.array.isRequired,
};

export default SliderPost;

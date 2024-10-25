import React from "react";
import { Modal, Image, Carousel } from "antd";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import VideoHLS from "~/utils/media/videoHLS";

const SliderPost = ({ open, setOpen, media }: any) => {
    const isLgScreen = useSelector((state: any) => state.screen.isLgScreen);
    return (
        <div>
            <Modal
                width={isLgScreen ? "70%" : "95%"}
                style={{ top: 0 }}
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={null}
            >
                <Carousel arrows infinite={true}>
                    {media.map((item: any, index: any) => {
                        if (item.type === 0) {
                            return (
                                <div key={index} className="max-h-[80vh]">
                                    <Image
                                        width={"100%"}
                                        height={"100%"}
                                        src={item.url}
                                    />
                                </div>
                            );
                        } else {
                            return <VideoHLS key={index} src={item.url} />;
                        }
                    })}
                </Carousel>
            </Modal>
        </div>
    );
};

SliderPost.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    media: PropTypes.array,
};

export default SliderPost;
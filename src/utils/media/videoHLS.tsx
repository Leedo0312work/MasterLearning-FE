import React, { useRef } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
    PlyrLayout,
    plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import PropTypes from "prop-types";
interface VideoProps {
    src: string;
    controlType?: string;
}

const VideoHLS: React.FC<VideoProps> = ({ src, controlType = "control" }) => {
    const videoRef = useRef(null);

    return (
        <div style={{ width: "100%", height: "auto" }}>
            <div ref={videoRef} style={{ position: "relative" }}>
                <MediaPlayer playsInline src={src} controls={false}>
                    <MediaProvider />
                    {controlType === "control" && (
                        <>
                            <DefaultVideoLayout
                                thumbnails=""
                                icons={defaultLayoutIcons}
                            />
                        </>
                    )}
                </MediaPlayer>
            </div>
        </div>
    );
}
export default VideoHLS;


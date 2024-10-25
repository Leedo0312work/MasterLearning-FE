import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import PropTypes from "prop-types";
import React from "react";
interface VideoProps {
    src: string;
}
const Video: React.FC<VideoProps> = ({ src }) => {
    return (
        <MediaPlayer src={src}>
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
    );
};
Video.propTypes = {
    src: PropTypes.string.isRequired,
};

export default Video;
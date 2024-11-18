import {
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalMicrophoneTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
    IAgoraRTCRemoteUser,
    useRTCClient,
} from 'agora-rtc-react';
import './style.css';
import { useEffect, useState } from 'react';
import axiosIns from '../../services/axios';
import { useParams } from 'react-router-dom';

export const Meeting = () => {
    const { id } = useParams();
    console.log(id);
    const [calling, setCalling] = useState(false);
    const isConnected = useIsConnected();
    const client = useRTCClient();
    const [channel, setChannel] = useState(id);
    const [token, setToken] = useState('');
    const [userPin, setUserPin] = useState<IAgoraRTCRemoteUser | null>(null);
    const [micOn, setMic] = useState(true);
    const [pinUserId, setPinUserId] = useState<number | string | null>(null);
    const [cameraOn, setCamera] = useState(true);
    const [nameRemote, setNameRemote] = useState<{ [key: string]: string }>({});
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    const user_info = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user_info);
    useJoin(
        {
            appid: '6e6b876a37cb492ca84fab1a112d779e',
            channel: channel as string,
            token: token ? token : null,
            uid: user_info._id,
        },
        calling,
    );

    //Rời room và clear states
    const leaveRoom = async () => {
        try {
            await client.leave();
            if (localMicrophoneTrack) localMicrophoneTrack.close();
            if (localCameraTrack) localCameraTrack.close();
            setPinUserId(null);
            setNameRemote({});
            setCalling(false);
            setRemoteUsers([]);
            console.log('Đã rời khỏi phòng');
        } catch (error) {
            console.error('Error leaving room:', error);
        }
    };

    //Lấy token để vào room
    const handleGetMeetingToken = async (channelProps?: string) => {
        try {
            const response = await axiosIns.postAuth(`/classes/get-meeting-token`, {
                classId: channelProps ? channelProps : channel,
            });
            setToken(response?.data.token);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    useEffect(() => {
        handleGetMeetingToken();
    }, []);

    //Lấy về danh sách remote users đang có trong room
    const remoteUsersList = useRemoteUsers();
    console.log(remoteUsersList);
    useEffect(() => {
        setRemoteUsers(remoteUsersList);
    }, [remoteUsersList]);

    //Ban đầu chỉ có ID có user, lấy tên user từ API để hiển thị
    const handleGetName = async () => {
        const response = await Promise.all(
            remoteUsers.map((remoteUser) => {
                return axiosIns.getAuth(`/users/get-profile/${remoteUser.uid}`);
            }),
        );
        const resName: { [key: string]: string } = {};

        response.map((res) => {
            resName[res?.data.result._id] = res?.data.result.name;
        });

        setNameRemote(resName);
    };

    useEffect(() => {
        handleGetName();
    }, [remoteUsers]);

    //JSX hiển thị chính người dùng
    const localUserJSX = (
        <div className="user">
            <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                cover="https://assets.zoom.us/images/en-us/desktop/generic/video-not-working.PNG"
            >
                <samp className="user-name">Bạn</samp>
            </LocalUser>
        </div>
    );
    console.log(localUserJSX);
    //Hàm xử lý ghim user
    const handlePin = (uid: string | number) => {
        const user = remoteUsers.find((user) => user.uid === uid);
        if (user) {
            if (pinUserId === user.uid) {
                setUserPin(null);
                setPinUserId(null);
            } else {
                setPinUserId(user.uid);
                setUserPin(user);
            }
        }
    };

    const handleJoinRoom = async () => {
        console.log('join room', token);
        setChannel(id as string);
        await handleGetMeetingToken(channel as string);
        setCalling(true);
    };

    //JSX hiển thị remote users
    const remoteUsersJSX = remoteUsers.map((user) => {
        if (pinUserId !== user.uid)
            return (
                <div className="user" key={user.uid}>
                    <RemoteUser
                        cover="https://assets.zoom.us/images/en-us/desktop/generic/video-not-working.PNG"
                        user={user}
                    >
                        <div
                            onClick={() => handlePin(user.uid)}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 10,
                            }}
                        >
                            {pinUserId === user.uid ? (
                                'Unpin'
                            ) : (
                                <i className="fa-solid fa-thumbtack tw-text-[20px]"></i>
                            )}
                        </div>
                        <samp className="user-name">{nameRemote[user.uid]}</samp>
                    </RemoteUser>
                </div>
            );
    });

    return (
        <>
            <div className="room">
                {isConnected ? (
                    <div className="user-list">
                        {/* User đang được ghim */}
                        {userPin && (
                            <div
                                className="user"
                                style={{
                                    width: '100vw',
                                    height: 'calc(100vh - 145px)',
                                }}
                                key={userPin.uid}
                            >
                                <RemoteUser
                                    cover="https://assets.zoom.us/images/en-us/desktop/generic/video-not-working.PNG"
                                    user={userPin}
                                >
                                    <div
                                        onClick={() => handlePin(userPin.uid)}
                                        style={{
                                            position: 'absolute',
                                            right: 10,
                                            top: 10,
                                        }}
                                    >
                                        <i className="fa-solid fa-thumbtack-slash tw-text-[20px]"></i>
                                    </div>
                                    <samp className="user-name">{nameRemote[userPin.uid]}</samp>
                                </RemoteUser>
                            </div>
                        )}
                        {/* User chính mình */}
                        {localUserJSX}

                        {/* User khác */}
                        {remoteUsersJSX}
                    </div>
                ) : (
                    // Control Join và chuyển các room
                    <div className="join-room">
                        <button
                            className={`join-channel ${!channel ? 'disabled' : ''}`}
                            disabled={!channel}
                            onClick={handleJoinRoom}
                        >
                            <span>Tham gia cuộc họp</span>
                        </button>
                    </div>
                )}
            </div>
            <div style={{ height: '1px' }}></div>
            {/* Control của room khi đang gọi */}
            {isConnected && (
                <div className="control">
                    <div className="left-control">
                        <button className="btn" onClick={() => setMic((a) => !a)}>
                            <i className={`i-microphone ${!micOn ? 'off' : ''}`} />
                        </button>
                        <button className="btn" onClick={() => setCamera((a) => !a)}>
                            <i className={`text-[200px] i-camera ${!cameraOn ? 'off' : ''}`} />
                        </button>
                    </div>
                    <button
                        className={`btn btn-phone ${calling ? 'btn-phone-active' : ''}`}
                        onClick={leaveRoom}
                    >
                        {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
                    </button>
                </div>
            )}
        </>
    );
};

export default Meeting;

import React, { useState } from 'react';
import { Avatar, Spin } from 'antd';
import Comment from './Chat';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import conversationServices from '~/services/conversation';
import Chat from './Chat';
import ControlChat from './ControlChat';

const Chats = () => {
    const [listChat, setListChat] = useState<any>([]);
    const [pagiantion, setPagination] = useState({
        page: 1,
        total_page: 0,
    });
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    const { id } = useParams();
    const comments = useQuery({
        queryKey: ['getChats', id, 1, 20],
        queryFn: async () => {
            const response = await conversationServices.getChats({
                class_id: id,
                page: 1,
                limit: 20,
            });
            return response;
        },
    });
    useEffect(() => {
        setListChat(comments.data?.result || []);
        setPagination({
            total_page: comments?.data?.total_page,
            page: comments?.data?.page,
        });
    }, [comments.data]);

    if (comments.isLoading) {
        return <Spin className="w-full" spinning={true} />;
    }
    console.log(pagiantion);
    const fetchMoreComments = async () => {
        console.log('hihi');
        if (id && pagiantion.page < pagiantion.total_page) {
            const res = await conversationServices.getChats({
                class_id: id,
                page: pagiantion.page + 1,
                limit: 20,
            });
            setListChat((pre: any) => [...pre, ...res.result]);
            setPagination({
                total_page: res.total_page,
                page: res.page,
            });
        }
    };
    return (
        <div>
            <div className=" ">
                {listChat && listChat.length > 0 && (
                    <div
                        className=""
                        id="scrollableDiv"
                        style={{
                            width: '98%',
                            height: 'calc(100vh - 130px)',
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                        }}
                    >
                        {/*Put the scroll bar always on the bottom*/}
                        <InfiniteScroll
                            className=""
                            dataLength={listChat.length}
                            next={fetchMoreComments}
                            style={{
                                display: 'flex',
                                flexDirection: 'column-reverse',
                            }}
                            inverse={true}
                            hasMore={pagiantion.page < pagiantion.total_page}
                            loader={<Spin spinning={true} />}
                            scrollableTarget="scrollableDiv"
                        >
                            {listChat.map((chat: any) => (
                                <div
                                    key={chat._id}
                                    className={
                                        chat.user._id === userInfo._id
                                            ? 'tw-flex tw-justify-end'
                                            : ''
                                    }
                                >
                                    <Chat isMe={chat.user._id === userInfo._id} chat={chat} />
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                )}

                {listChat.length === 0 && <p className="text-center py-10"></p>}
            </div>
            <div className="tw-fixed tw-flex tw-justify-center tw-w-[80%] tw-bottom-3 tw-px-2 tw-bg-white">
                <div className="tw-w-[100%]">
                    <ControlChat setListChat={setListChat} />
                </div>
            </div>
        </div>
    );
};

Chats.propTypes = {
    postId: PropTypes.string.isRequired,
    listChat: PropTypes.arrayOf(PropTypes.object),
    setListChat: PropTypes.func.isRequired,
};

export default Chats;


import { Avatar, Image, Input } from "antd";
const { TextArea } = Input;
import React, { useEffect } from "react";
import { useState } from "react";
import MediaPost from "~/components/Post/MediaPost";
import ModalComment from "~/components/Post/ModalComment";
import tweetServices from "~/services/tweet";
import { IPost } from '~/models/IPost';
import { formatDateTime, formatNumber, timeAgo } from "~/utils/common";
import ReadMoreReadLess from "react-read-more-read-less";
import Comments from "./Comments";
import ModalOption from "./ModalOption";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "react-query";





const Post: React.FC<any> = ({ post, isShowGroupName = true, listPost, setListPost }) => {
    const [tym, setTym] = React.useState<boolean>(false);
    const [showComments, setShowComments] = React.useState<boolean>(false);

    const [tyming, setTyming] = React.useState<boolean>(false);
    const [listComment, setListComment] = React.useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        total_page: 0,
    });
    const { id } = useParams();
    const class_id = useMemo(() => id?.substring(0), [id]);

    const posts = useQuery({
        queryKey: ["getNewsfeed", class_id, 10, 1],
        queryFn: async () =>
            await tweetServices.getNewFeeds({
                class_id: class_id,
                page: 1,
                limit: 10,
            }),
    });

    useEffect(() => {
        setListPost(posts.data?.result || []);
        setPagination({
            total_page: posts?.data?.total_page,
            page: posts?.data?.page,
        });
    }, [posts.data, setListPost]);

    useEffect(() => {
        setTym(!!post.liked);
    }, [post]);

    const handleTym = async () => {
        if (tyming) return;

        setTyming(true);

        try {
            if (tym) {
                await tweetServices.unlike(post._id);
                setTym(false);
                post.likes--;
            } else {
                await tweetServices.like(post._id);
                setTym(true);
                post.likes++;
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        } finally {
            setTyming(false);
        }
    };

    const refetchPosts = async () => {
        const res = await tweetServices.getNewFeeds({
            class_id,
            page: 1,
            limit: 10,
        });
        setListPost(res.result);
        setPagination({
            total_page: res.total_page,
            page: 1,
        });
    };

    return (
        <div className="tw-bg-white tw-p-4 tw-rounded-3xl tw-my-1 tw-w-[90%]">
            <div className="tw-flex tw-items-start tw-justify-between">
                <div className="tw-flex tw-items-center">
                    <Avatar size={45} src={post?.user?.avatar} />
                    <div className="tw-flex">
                        {isShowGroupName ? (
                            <div className="tw-leading-none tw-ml-2">
                                <p className="tw-text-[16px]">{post?.user?.name}</p>
                                <p className="tw-text-[14px] tw-font-bold tw-text-align-center">
                                    {post?.class?.[0]?.name}
                                </p>
                            </div>
                        ) : (
                            <div className="tw-leading-none tw-ml-2 ">
                                <p className="tw-text-[16px] tw-font-semibold">
                                    {post?.user?.name}
                                </p>
                            </div>

                        )
                        }

                    </div>


                </div>
                <div className="tw-flex tw-mt-2 tw-leading-none">
                    <div className="tw-text-[14px] tw-mt-1 tw-text-gray-500">
                        {timeAgo(post?.created_at)}
                    </div>
                    <ModalOption post={post} postId={post._id} refetchPosts={refetchPosts} />


                </div>
            </div>

            <div className="content-post tw-my-3 tw-text-[16px] tw-px-5 tw-text-justify tw-leading-tight">
                <ReadMoreReadLess
                    charLimit={400}
                    readMoreText={
                        <span style={{ color: "#2881E2" }}>Xem thêm</span>
                    }
                    readLessText={
                        <span style={{ color: "#2881E2" }}>Thu gọn</span>
                    }
                >
                    {post?.content}
                </ReadMoreReadLess>
            </div>
            <MediaPost post={post} />
            <div className="tw-text-gray-700 tw-text-[15px] tw-flex tw-justify-between">
                <p>
                    {Number(post?.likes)} thích,{" "}
                    {Number(post?.views)} lượt xem
                </p>
                <p>
                    {Number(post?.comment)} bình luận
                    {/* {Number(post?.retweet)} chia sẻ */}
                </p>
            </div>
            <hr className="tw-mt-1" />
            <div className="tw-flex tw-mt-2 tw-justify-around">
                <div
                    className=" tw-flex tw-items-center tw-cursor-pointer"
                    onClick={handleTym}
                >
                    <i
                        className={`${tym ? "fa-solid tw-text-[red]" : "fa-regular"
                            } fa-heart tw-text-[25px] tw-mr-2`}
                    ></i>
                    <p className={`${tym ? " tw-text-[red]" : ""} `}>Thích</p>
                </div>
                <div
                    onClick={() => setShowComments(true)}
                    className="tw-flex tw-cursor-pointer"
                >
                    <i className="tw-text-[25px] tw-mr-2 fa-regular fa-comment"></i>
                    <p>Bình luận</p>
                </div>
                {/* <div className="tw-flex">
                    <i className="tw-text-[25px] tw-mr-2 fa-regular fa-share-from-square"></i>
                    <p>Chia sẻ</p>
                </div> */}
            </div>
            {showComments && (
                <ModalComment
                    open={showComments}
                    setOpen={setShowComments}
                    post={post}
                />
            )}

        </div>
    );
};

export default Post;

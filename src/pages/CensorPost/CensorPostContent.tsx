import React from "react";
import { Avatar, Button } from "antd";
import { timeAgo } from "~/utils/common";
import ReadMoreReadLess from "react-read-more-read-less";
import MediaPost from "~/components/Post/MediaPost";
import tweetServices from "~/services/tweet";

const CensorPostContent = ({ post, listPost, setListPost, refetchPosts }: any) => {
    const fetchPosts = async () => {
        try {
            const response = await tweetServices.getListNotCensor({
                page: 1,
                limit: 10,
            });
            setListPost(response.result);

        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const handleApprove = async () => {
        try {
            // Gọi API duyệt bài
            await tweetServices.postCensor(post._id);
            await fetchPosts();

            setListPost((prev: any) => prev.filter((item: any) => item._id !== post._id))
        } catch (error) {
            console.error("Error approving post:", error);
        }
    };

    return (
        <div className="tw-bg-white tw-p-4 tw-rounded-3xl tw-my-1 tw-w-[90%]">
            <div className="tw-flex tw-items-start tw-justify-between">
                <div className="tw-flex tw-items-center">
                    <Avatar size={45} src={post?.user?.avatar} />
                    <div className="tw-leading-none tw-ml-2">
                        <p className="tw-text-[16px]">{post?.user?.name}</p>
                        <p className="tw-text-[14px] tw-font-bold">
                            {post?.class?.[0]?.name}
                        </p>
                    </div>
                </div>
                <div className="tw-text-[14px] tw-mt-1 tw-text-gray-500">
                    {timeAgo(post?.created_at)}
                </div>
            </div>

            <div className="content-post tw-my-3 tw-text-[16px] tw-px-5 tw-text-justify tw-leading-tight">
                <ReadMoreReadLess
                    charLimit={400}
                    readMoreText={<span style={{ color: "#2881E2" }}>Xem thêm</span>}
                    readLessText={<span style={{ color: "#2881E2" }}>Thu gọn</span>}
                >
                    {post?.content}
                </ReadMoreReadLess>
            </div>

            <MediaPost post={post} />

            <div className="tw-flex tw-justify-end tw-mt-4">
                <Button type="primary" onClick={handleApprove}>
                    Duyệt
                </Button>
            </div>
        </div>
    );
};

export default CensorPostContent;

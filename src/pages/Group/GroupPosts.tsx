import React from "react";
import Post from "~/components/Post";
import { useQuery } from "react-query";
import tweetServices from "~/services/tweet";
import { Spin } from "antd";
import { TweetType } from "~/enums/tweet";
import PropsType from "prop-types";

const PostsGroup = ({ class_id }: any) => {
    const getPosts = useQuery({
        queryKey: ["getPostsGroup", class_id, 10, 1],
        queryFn: async () =>
            await tweetServices.getNewFeeds({
                class_id,
                page: 1,
                limit: 10,
            }),
        //refetchInterval: 10000,
    });
    const posts = getPosts?.data?.result;
    console.log(posts);
    return (
        <div className="w-full flex flex-col items-center">
            <Spin spinning={getPosts.isLoading}></Spin>
            {posts?.map((post: any) => {
                if (post.type === TweetType.TWEET)
                    return (
                        <Post
                            isShowGroupName={false}
                            key={post._id}
                            post={post}
                        />
                    );
            })}
        </div>
    );
};

PostsGroup.propTypes = {
    class_id: PropsType.string.isRequired,
};
export default PostsGroup;

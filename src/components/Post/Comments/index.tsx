import React, { useState } from "react";
import { Avatar, Spin } from "antd";
import Comment from "./Comment";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useQuery } from "react-query";
import tweetServices from "~/services/tweet";
import InfiniteScroll from "react-infinite-scroll-component";

const Comments = ({ postId, listComment, setListComment }: any) => {
    const [pagiantion, setPagination] = useState({
        page: 1,
        total_page: 0,
    });
    const comments = useQuery({
        queryKey: ["getComments", postId, 1, 10],
        queryFn: async () => {
            const response = await tweetServices.getComments({
                postId,
                page: 1,
                limit: 10,
            });
            return response;
        },
    });
    useEffect(() => {
        setListComment(comments.data?.result || []);
        setPagination({
            total_page: comments?.data?.total_page,
            page: comments?.data?.page,
        });
    }, [comments.data]);

    if (comments.isLoading) {
        return <Spin className="tw-w-full" spinning={true} />;
    }

    const fetchMoreComments = async () => {
        if (postId && pagiantion.page < pagiantion.total_page) {
            const res = await tweetServices.getComments({
                postId,
                page: pagiantion.page + 1,
                limit: 10,
            });
            setListComment((pre: any) => [...pre, ...res.result]);
            setPagination({
                total_page: res.total_page,
                page: res.page,
            });
        }
    };
    return (
        <div className=" ">
            {listComment && listComment.length > 0 && (
                <InfiniteScroll
                    className=""
                    height={"50vh"}
                    dataLength={listComment.length}
                    next={fetchMoreComments}
                    hasMore={pagiantion.page < pagiantion.total_page}
                    loader={<Spin className="tw-w-full" spinning={true} />}
                >
                    {listComment.map((comment: any) => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </InfiniteScroll>
            )}

            {listComment.length === 0 && (
                <p className="tw-text-center tw-py-10">Chưa có bình luận nào</p>
            )}
        </div>
    );
};

Comments.propTypes = {
    postId: PropTypes.string.isRequired,
    listComment: PropTypes.arrayOf(PropTypes.object),
    setListComment: PropTypes.func.isRequired,
};

export default Comments;
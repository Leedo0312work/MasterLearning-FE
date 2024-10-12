import React, { useMemo, useEffect, useState } from 'react';
import Post from '~/components/Post';
import { useParams } from "react-router-dom";
import styles from './styles.module.css';
import CreatePost from '~/components/CreatePost';
import { Spin } from "antd";
import { TweetType } from '~/enums/tweet';
import { useQuery } from 'react-query';
import tweetServices from '~/services/tweet';
import InfiniteScroll from "react-infinite-scroll-component";

function NewsfeedContent({ classId, listPost, setListPost }: any) {
    const [pagination, setPagination] = useState({
        page: 1,
        total_page: 0,
    });
    const { id } = useParams();
    const class_id = useMemo(() => id?.substring(1), [id]);

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

    const fetchMorePosts = async () => {
        if (class_id && pagination.page < pagination.total_page) {
            const res = await tweetServices.getNewFeeds({
                class_id,
                page: pagination.page + 1,
                limit: 10,
            });
            setListPost((prev: any) => [...prev, ...res.result]);
            setPagination({
                total_page: res.total_page,
                page: res.page,
            });
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

    if (posts.isLoading) {
        return <Spin className="tw-w-full" spinning={true} />;
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.createPost}>
                <CreatePost class_id={class_id} refetchPosts={refetchPosts} />
            </div>
            <div className={styles.listPost}>
                {listPost && listPost.length > 0 && (
                    <InfiniteScroll

                        height={"50vh"}
                        dataLength={listPost.length}
                        next={fetchMorePosts}
                        hasMore={pagination.page < pagination.total_page}
                        loader={<Spin className="tw-w-full" spinning={true} />}
                    >
                        <div className={styles.scrollContent}>
                            {listPost.map((post: any) => {
                                if (post.type === TweetType.TWEET) {
                                    return <Post key={post._id} post={post} listPost={listPost}
                                        setListPost={setListPost} />;
                                }
                                return null;
                            })}
                        </div>
                    </InfiniteScroll>
                )}
                {listPost.length === 0 && (
                    <p className="tw-text-center tw-py-10">Chưa có bài viết nào</p>
                )}
            </div>
        </div>
    );
}

export default NewsfeedContent;

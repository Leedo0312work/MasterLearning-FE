import React, { useMemo, useEffect, useState } from 'react';
import Post from '~/components/Post';
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import CreatePost from '~/components/CreatePost';
import { Spin } from 'antd';
import { TweetType } from '~/enums/tweet';
import { useQuery } from 'react-query';
import tweetServices from '~/services/tweet';
import InfiniteScroll from 'react-infinite-scroll-component';

function NewsfeedContent({ classId, listPost, setListPost }: any) {
    const [pagination, setPagination] = useState({
        page: 1,
        total_page: 0,
    });
    const { id } = useParams();
    const class_id = useMemo(() => id?.substring(0), [id]);
    // console.log(class_id);
    const posts = useQuery({
        queryKey: ['getNewsfeed', class_id, 10, 1],
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
            <div className={styles.listPost}>

                {listPost && listPost.length > 0 && (
                    <InfiniteScroll
<<<<<<< HEAD
                        height={'80vh'}
=======
                        height={'100%'}
>>>>>>> 66fd97cce0e7f051bf0c51490291b81ccf04e449
                        dataLength={listPost.length}
                        next={fetchMorePosts}
                        hasMore={pagination.page < pagination.total_page}
                        loader={<Spin className="tw-w-full" spinning={true} />}
                        // style={{
                        //     scrollbarWidth: 'none',
                        //     msOverflowStyle: 'none',
                        // }}
                    >
<<<<<<< HEAD
                        <div className={styles.createPost} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
=======
                        <div
                            className={styles.createPost}
                            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                        >
>>>>>>> 66fd97cce0e7f051bf0c51490291b81ccf04e449
                            <CreatePost class_id={class_id} refetchPosts={refetchPosts} />
                        </div>
                        <div className={styles.scrollContent}>
                            {listPost.map((post: any) => {
                                if (post.type === TweetType.TWEET) {
                                    return (
                                        <Post
                                            key={post._id}
                                            post={post}
                                            listPost={listPost}
                                            setListPost={setListPost}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </InfiniteScroll>
                )}
                {listPost.length === 0 && (
<<<<<<< HEAD
                    <div className={styles.createPost} style={{ width: "720px", display: "flex", justifyContent: "center" }}>
=======
                    <div
                        className={styles.createPost}
                        style={{ width: '720px', display: 'flex', justifyContent: 'center' }}
                    >
>>>>>>> 66fd97cce0e7f051bf0c51490291b81ccf04e449
                        <CreatePost class_id={class_id} refetchPosts={refetchPosts} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewsfeedContent;

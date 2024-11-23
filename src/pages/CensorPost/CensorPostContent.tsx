import React, { useMemo, useEffect, useState } from 'react';
import Post from '~/components/Post';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import CreatePost from '~/components/CreatePost';
import { Spin } from 'antd';
import { TweetType } from '~/enums/tweet';
import { useQuery } from 'react-query';
import tweetServices from '~/services/tweet';
import InfiniteScroll from 'react-infinite-scroll-component';

function CensorPostContent({ listPost, setListPost }: any) {
    const [pagination, setPagination] = useState({
        page: 1,
        total_page: 0,
    });

    const posts = useQuery({
        queryKey: ['getListNotCensor', 10, 1],
        queryFn: async () =>
            await tweetServices.getListNotCensor({
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
    console.log("data", listPost);
    const fetchMorePosts = async () => {
        if (pagination.page < pagination.total_page) {
            const res = await tweetServices.getListNotCensor({

                page: pagination.page + 1,
                limit: 10,
            });
            setListPost(res.result);
            setPagination({
                total_page: res.total_page,
                page: res.page,
            });
        }
    };
    const refetchPosts = async () => {
        const res = await tweetServices.getListNotCensor({

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
                        height={'100%'}
                        dataLength={listPost.length}
                        next={fetchMorePosts}
                        hasMore={pagination.page < pagination.total_page}
                        loader={<Spin className="tw-w-full" spinning={true} />}

                    >

                        <div className={styles.scrollContent}>
                            {listPost.map((post: any) => {

                                return (
                                    <Post
                                        key={post._id}
                                        post={post}
                                        listPost={listPost}
                                        setListPost={setListPost}
                                    />
                                );


                            })}
                        </div>
                    </InfiniteScroll>
                )}
                {listPost.length === 0 && (
                    <div
                        className={styles.createPost}
                        style={{ width: '720px', display: 'flex', justifyContent: 'center' }}
                    >
                        Không
                    </div>
                )}
            </div>
        </div>
    );
}

export default CensorPostContent;

import styles from './style.module.css';
import Post from '~/components/Post';
import { useQuery } from 'react-query';
import { useEffect, useMemo, useState } from 'react';
import NewsfeedHeader from '~/components/NewsfeedHeader';
import NewsfeedSiderBarRight from '~/components/NewsfeedSiderBarRight';
import NewsfeedContent from '~/components/NewsfeedContent';

import { useCallback } from 'react';
import { IPost } from '~/models/IPost';
import CreatePost from '~/components/CreatePost';
import useAuthStore from '~/store/useAuthStore';
import { IComment } from '~/models/IComment';
import { useParams } from "react-router-dom";
import tweetServices from '~/services/tweet';
import { TweetType } from '~/enums/tweet';
import CreatePostModal from '../Group/CreatePostModal';
import Group from '../Group';

function Newsfeed() {
    // Define the shape of the response from the query
    const { id } = useParams();
    const _id = useMemo(() => {
        return id?.substring(1);
    }, [id]);
    const getNewFeeds = useQuery({
        queryKey: ["getNewsfeed", _id, 10, 1],
        queryFn: async () =>
            await tweetServices.getNewFeeds({
                class_id: _id,
                page: 1,
                limit: 10,
            }),
        // refetchInterval: 10000,
    });


    // Type the posts array to ensure it matches the IPost type
    const posts: IPost[] | undefined = getNewFeeds?.data?.result;

    const getAvatar = useAuthStore((state) => state.getAvatar);

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <NewsfeedHeader />
                <NewsfeedContent />

            </div>
            <NewsfeedSiderBarRight />
        </div>
    );
}

export default Newsfeed;

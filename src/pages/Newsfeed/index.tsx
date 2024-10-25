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
    const [listPost, setListPost] = useState([]);
    const { id } = useParams();
    const class_id = useMemo(() => {
        return id?.substring(0);
    }, [id]);
    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <NewsfeedHeader />
                <NewsfeedContent classId={class_id}
                    listPost={listPost}
                    setListPost={setListPost} />


            </div>
            {/* <NewsfeedSiderBarRight /> */}
        </div>
    );
}

export default Newsfeed;

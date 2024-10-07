import Post from '~/components/Post';
import { useParams } from "react-router-dom";
import styles from './styles.module.css';
import CreatePost from '~/components/CreatePost';
import useAuthStore from '~/store/useAuthStore';
import { IPost } from '~/models/IPost';
import { IComment } from '~/models/IComment';
import { TweetType } from '~/enums/tweet';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import tweetServices from '~/services/tweet';

function NewsfeedContent() {
    const getAvatar = useAuthStore((state) => state.getAvatar);
    const { id } = useParams();
    const class_id = useMemo(() => {
        return id?.substring(1);
    }, [id]);
    const getNewFeeds = useQuery({
        queryKey: ["getNewsfeed", class_id, 10, 1],
        queryFn: async () =>
            await tweetServices.getNewFeeds({
                class_id: class_id,
                page: 1,
                limit: 10,
            }),
        // refetchInterval: 10000,
    });
    const posts: any = getNewFeeds?.data?.result;

    return (
        <div className={styles.wrap}>
            <div className={styles.createPost}>
                <CreatePost class_id={class_id} />
            </div>
            <div className={styles.listPost}>
                {posts?.map((post: any) => {
                    if (post.type === TweetType.TWEET) {
                        return <Post key={post._id} post={post} />;
                    }
                    return null;
                })}

            </div>
        </div>
    );
}

export default NewsfeedContent;

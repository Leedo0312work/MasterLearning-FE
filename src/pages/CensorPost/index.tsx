import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Post from '~/components/Post';
import tweetServices from '~/services/tweet';

const CensorPost = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        total_page: 10,
    });
    const [listPost, setListPost] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await tweetServices.getListNotCensor({
                    page: 1,
                    limit: 10,
                });
                const data = response.result;
                console.log("data", data);
                setListPost(data); // Truy cập đúng key chứa mảng bài viết
                setPagination({
                    page: data.current_page,
                    total_page: data.total_pages,
                });


            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []); // Thay đổi khi `page` thay đổi
    console.log("Fetched listPost:", listPost.length);
    return (
        <div className={styles.wrap}>
            <div className={styles.listPost}>
                {listPost.length > 0 ? (
                    <div className={styles.scrollContent}>
                        {listPost.map((post) => (
                            <Post
                                key={post._id}
                                post={post}
                                listPost={listPost}
                                setListPost={setListPost}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Không có bài viết nào cần duyệt.</p>
                )}
            </div>
        </div>
    );
};

export default CensorPost;

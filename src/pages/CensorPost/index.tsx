import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import CensorPostContent from "./CensorPostContent";
import tweetServices from "~/services/tweet";

const CensorPost = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        total_page: 0,
    });
    const [listPost, setListPost] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await tweetServices.getListNotCensor({
                page: pagination.page,
                limit: 10,
            });
            setListPost(response.result);
            setPagination({
                ...pagination,
                total_page: response.total_page,
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };


    useEffect(() => {
        fetchPosts();
    }, [pagination.page]);


    const refetchCensorPosts = async () => {
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
    return (
        <div className={styles.wrap}>
            <div className={styles.listPost}>
                <div className={styles.scrollContent}>
                    {listPost.map((post) => (
                        <CensorPostContent
                            key={post._id}
                            post={post}
                            listPost={listPost}
                            setListPost={setListPost}

                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CensorPost;

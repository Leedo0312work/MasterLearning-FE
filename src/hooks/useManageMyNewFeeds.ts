// import { useParams } from 'react-router-dom';
// import { useEffect, useMemo, useState } from 'react';
// import { toast } from 'react-toastify';

// import API from '~/network/API';
// import { useMutation, useQuery } from 'react-query';
// import pusher from '~/packages/pusher';
// import { getPostByClassId } from '~/repositories/post';
// import { IPost } from '~/models/IPost';
// import { ResponseAPI } from '~/app/response';
// import { AxiosError } from 'axios';
// import { IComment } from '~/models/IComment';
// import { TweetType } from '~/enums/tweet';
// import axiosIns from '~/services/axios';
// import Post from '~/components/Post';

// export default function useManageMyNewFeeds() {
//     const [listPost, setListPost] = useState<IPost[]>([]);

//     const { id } = useParams();
//     const class_id = useMemo(() => {
//         return id?.substring(1);
//     }, [id]);

//     // const { data } = useQuery(['getNewFeed', class_id], async () => getPostByClassId(class_id as string, 1, 10), {
//     //     onSuccess(data) {

//     //         data.data.forEach((item) => {
//     //             if (!Boolean(item?.comments)) {
//     //                 item.comments = []; // Initialize comments if they don't exist
//     //             }
//     //         });
//     //         setListPost(data.data); // Set the list of posts

//     //     },
//     // });

//     // const { mutate: mutateAddPost } = useMutation<
//     //     ResponseAPI,
//     //     AxiosError<ResponseAPI>,
//     //     Pick<IPost, 'content' | 'class_id'>
//     // >(
//     //     'addPost',
//     //     async (data) => {
//     //         const response = await axiosIns.post('/tweets/create', data);
//     //         return response?.data.data;
//     //     },
//     //     {
//     //         async onSuccess(post) { },
//     //         onError(err) {
//     //             console.log(err);
//     //             toast.error('Thêm bài viết thất bại vui lòng thử lại');
//     //         },
//     //     },
//     // );
//     // const { mutate: mutateAddComment } = useMutation<
//     //     IComment,
//     //     AxiosError<ResponseAPI>,
//     //     Pick<IComment, 'content' | 'parent_id'>
//     // >(
//     //     'addComment',
//     //     async (data) => {
//     //         const response = await API.post('/tweets/create', data);
//     //         return response.data.data;
//     //     },
//     //     {
//     //         async onSuccess(comment) {
//     //             const clone = structuredClone(listPost);

//     //             const post = clone.find((item) => Number(item?._id) === Number(comment?.parent_id));
//     //             if (!post) return;
//     //             // post?.comments?.unshift(comment);

//     //             setListPost(clone);
//     //         },
//     //         onError(err) {
//     //             console.log(err);
//     //             toast.error('Thêm comment thất bại vui lòng thử lại');
//     //         },
//     //     },
//     // );

//     // useEffect(() => {
//     //     if (!id) return;

//     //     const channel = pusher.subscribe(`class-${id}-newsfeed`);

//     //     channel.bind('create-post', (post: IPost) => {
//     //         setListPost((prevState) => {
//     //             if (prevState.length === 0) return [post];
//     //             if (Number(prevState[0]?.id) === Number(post?.id)) return prevState;

//     //             if (!Boolean(post?.comments)) {
//     //                 post.comments = [];
//     //             }
//     //             return [post, ...prevState];
//     //         });
//     //     });
//     // }, [id]);

//     return {
//         listPost,
//         setListPost,
//         mutateAddPost,
//         mutateAddComment,
//         class_id,
//     };
// }

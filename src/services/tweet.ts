import axios from "axios";
import axiosIns from "./axios";
import { message, Spin } from "antd";
class TweetServices {
    async createTweet(data: any) {
        const response = await axiosIns.postAuth("/tweets/create", data);
        return response;
    }
    async getNewFeeds(data: any) {
        const response = await axiosIns.getAuth(
            `/tweets?page=${data.page}&limit=${data.limit}&class_id=${data.class_id}`
        );
        return response?.data;
    }
    async getTweet(postId: string) {
        const response = await axiosIns.getAuth(
            `/tweets/tweet/${postId}`
        );
        return response?.data;
    }

    async getComments(data: any) {
        const response = await axiosIns.getAuth(
            `/tweets/tweet/${data.postId}/children?tweet_type=1&limit=${data.limit}&page=${data.page}`
        );
        return response?.data;
    }

    async like(postId: string) {
        const response = await axiosIns.postAuth(`/likes/like`, {
            tweet_id: postId,
        });
        return response?.data;
    }

    async unlike(postId: string) {
        const response = await axiosIns.postAuth(`/likes/unlike`, {
            tweet_id: postId,
        });
        return response?.data;
    }
    async deleteTweet(postId: string) {
        const response = await axiosIns.getAuth(`/tweets/delete/${postId}`);
        return response?.data;
    }
    async updateTweet(data: any, postId: string) {
        const response = await axiosIns.postAuth(`/tweets/update/${postId}`, data);
        return response?.data;
    }
}

const tweetServices = new TweetServices();
export default tweetServices;
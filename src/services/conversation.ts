import axios from 'axios';
import axiosIns from './axios';
import { message, Spin } from 'antd';
class ConversationServices {
    async createChat(data: any) {
        const response = await axiosIns.postAuth('/conversations/send-message', data);
        return response;
    }
    async getChats(data: any) {
        const response = await axiosIns.getAuth(
            `/conversations/get-conversation/${data.class_id}?page=${data.page}&limit=${data.limit}`,
        );
        return response?.data;
    }
}

const conversationServices = new ConversationServices();
export default conversationServices;

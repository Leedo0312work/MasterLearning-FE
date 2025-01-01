import io from 'socket.io-client';
const socket = io('https://masterlearning.leedowork.id.vn/api');
socket.disconnect();
export default socket;

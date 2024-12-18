import io from 'socket.io-client';
const socket = io('http://192.168.237.103:3030');
socket.disconnect();
export default socket;

import io from 'socket.io-client';
const socket = io('http://backend:3030');
socket.disconnect();
export default socket;

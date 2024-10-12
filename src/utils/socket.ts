import io from "socket.io-client";
const socket = io("http://localhost:3030");
socket.disconnect();
export default socket;

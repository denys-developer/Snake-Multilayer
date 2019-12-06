import socketIOClient from "socket.io-client";
const endpoint = 'http://192.168.0.102:8080/';
const socket = socketIOClient(endpoint);
export default socket;
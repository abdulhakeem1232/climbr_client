import io from 'socket.io-client';

// const socket = io('http://localhost:8080');
// const socket = io('http://localhost:30080');
const socket = io('https://climbrserver.site', {
    transports: ['websocket'],
    withCredentials: true
});





export default socket;

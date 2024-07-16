import io from 'socket.io-client';

// const socket = io('http://localhost:8080');
// const socket = io('http://localhost:30080');
const socket = io('http://climbrserver.site', { secure: true });




export default socket;

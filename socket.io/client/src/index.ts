// from: https://socket.io/docs/v4/

import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
  path: '/socket.io', // The path you've configured in Nginx
  transports: ['websocket'], // Use only WebSocket transport
});

socket.on('connect', () => {
  console.log('[client] connected to Socket.IO server');

  socket.on('message', (data) => {
    console.log('[client] received message:', data);
  });

  // Example: Send a message to the server
  socket.emit('message', 'Hello, server!');
});

// socket.on('disconnect', () => {
//   console.log('Disconnected from Socket.IO server');
// });


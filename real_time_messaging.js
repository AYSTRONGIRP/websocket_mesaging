const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'messaging.html'));
});

io.on('connection', (socket) => {
    //console.log(socket.toString());
    
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        //io.emit('chat message', msg);
        socket.broadcast.emit('chat message',msg);
      });
    //socket.broadcast.emit('hi');
  }); 
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
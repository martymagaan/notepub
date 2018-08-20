const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let content = '';

io.on('connection', (socket) => {
  console.log('User connected');

  socket.emit('load-content', content);

  socket.on('change-content', (updatedContent) => {
    content = updatedContent;
    io.emit('load-content', content);
  });
});

http.listen(3002, () => {
  console.log('Listening on port 3002');
});

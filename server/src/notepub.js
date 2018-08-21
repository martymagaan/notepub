const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

let content;

fs.readFile('content.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  content = data;
});

io.on('connection', (socket) => {
  console.log('User connected ' + Date().toLocaleString());

  socket.emit('load-content', content);

  socket.on('change-content', (updatedContent) => {
    content = updatedContent;
    io.emit('load-content', content);
  });

  socket.on('disconnect', () => {
    const fileName = 'content.txt';
    fs.writeFile(fileName, content, (err) => {
      if (err) throw err;
      console.log('User disconnected ' + Date().toLocaleString());
    });
  });
});

http.listen(3002, () => {
  console.log('Listening on port 3002');
});

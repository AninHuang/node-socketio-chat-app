var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();

var server = app.listen(4000, function() {
  console.log('Listening to the requests on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket) {
  console.log('socket connection', socket.id);
  // Refresh the page each time, the socket.id would be distinct

  // step2
  socket.on('chat', function(data) {
    io.emit('chat', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data)
  });

  socket.on('endtyping', function(data) {
    socket.broadcast.emit('endtyping', data)
  });
});
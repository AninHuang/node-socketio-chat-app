// Make connection
var socket = io.connect('http://localhost:4000'); // After setting, refresh the page

// Query DOM
var handle = document.getElementById('handle');
var message = document.getElementById('message');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function() {
  // step1
  socket.emit('chat', {
    handle: handle.value,
    message: message.value,
  });

  message.value = '';
});

// When user is typing the msg
message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value);
});

message.addEventListener('keyup', function() {
  socket.emit('endtyping', handle.value);
});

// step3
// Listen for events
socket.on('chat', function(data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' +
  data.message + '</p>';
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('endtyping', function(data){
  setTimeout(function(){
    feedback.innerHTML = '';
  }, 3000);
});
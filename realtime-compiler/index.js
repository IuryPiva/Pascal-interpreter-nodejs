var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/socket.io/socket.io.js', function(req, res){
  res.sendFile(__dirname + '/socket.io/socket.io.js');
});
app.get('/socket.io/socket.io.js.map', function(req, res){
  res.sendFile(__dirname + '/socket.io/socket.io.js.map');
});
app.get('/public/css/style.css', function(req, res){
  res.sendFile(__dirname + '/public/css/style.css');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});
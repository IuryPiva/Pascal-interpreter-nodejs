// console.log(Date())
const fileUtils = require('./src/utils/file-utils')
const lexer = require('./src/lexical/lexer')
const parser = require('./src/lexical/parser')
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
    let words = lexer(msg)
    io.emit('chat message', parser(words));
  });
});
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});
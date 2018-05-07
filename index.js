const fileUtils = require('./src/utils/file-utils')
const tokenizer = require('./src/lexical/tokenizer')
const lexer = require('./src/lexical/lexer')
const parser = require('./src/syntactic/parser')

const express = require('express')
//const bodyParser = require('body-parser')

var app = express()

var http = require('http').Server(app);
var io = require('socket.io')(http);


//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))


app.get('/hotkeys.js', function (req, res) {
  res.sendFile(__dirname + '/node_modules/hotkeys-js/dist/hotkeys.min.js');
})

http.listen(8080, function () {
  console.log('Server online');
});

io.on('connection', function (socket) {
  console.log('User connected');

  socket.on('disconnect', function () {
    console.log('User disconnected');
  });

  socket.on('lexer', function (data) {
    var stack = lexer(tokenizer(data.code), socket);
    io.emit('parser', stack)
  })

  socket.on('parser', function (stack) {
    var parsedStack = parser(stack)

    io.emit('analyser', parsedStack)

  })
  socket.on('lexerError', function(error) {
    console.log(error, 'error 46')
  })
});
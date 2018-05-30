const tokenizer = require('./src/lexical/tokenizer')
const lexer = require('./src/lexical/lexer')
const parser = require('./src/syntactic/parser')
const semantics = require('./src/semantics/semantics')

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

  socket.on('run(f5)', function (data) {
    let stack = lexer(tokenizer(data.code), socket)
    let parsedStack = parser(stack.slice(0))
    semantics(stack, socket)
    
    
    io.emit('doneCompiling', {stack, parsedStack})
  })

  socket.on('lexerError', function(error) {
    console.log(error, 'error 46')
  })
});
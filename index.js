const fileUtils = require('./src/utils/file-utils')
const lexer = require('./src/lexical/lexer')
const parser = require('./src/lexical/parser')
const analyser = require('./src/syntactic/analyser')

const express = require('express')
//const bodyParser = require('body-parser')

var app = express()

var http = require('http').Server(app);
var io = require('socket.io')(http);


//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))


app.get('/hotkeys.js', function(req, res) {
  res.sendFile(__dirname + '/node_modules/hotkeys-js/dist/hotkeys.min.js');
})

http.listen(8080, function(){
  console.log('Server online');
});

io.on('connection', function(socket){
  console.log('User connected');

  socket.on('disconnect', function(){
    console.log('User disconnected');
});

  socket.on('lexer', function(data) {
    var stack = parser(lexer(data.code));    
    io.emit('parser', stack)
})

  socket.on('parser', function(stack) {
    var parser = analyser(stack)
    
    io.emit('analyser', parser)

})

});



    

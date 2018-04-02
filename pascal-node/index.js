// console.log(Date())
const fileUtils = require('./src/utils/file-utils')
const lexer = require('./src/lexical/lexer')
const parser = require('./src/lexical/parser')
const express = require('express')
const bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.post('/get-code', function(req, res) {
    var code = req.body.code
    var stack = parser(lexer(code))
    
    res.send(stack);
    
})

app.listen('8080', (r, e) => {
   if (e) console.error(e)
   else console.log('Server started succesfully')
})




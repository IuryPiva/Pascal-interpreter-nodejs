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
    const code = Object.keys(req.body)[0]
    console.log(typeof code)
    console.log(code)
})

app.listen('8080', (r, e) => {
   if (e) console.error(e)
   else console.log('Server started succesfully')
})

console.log(parser(lexer("dacu")));

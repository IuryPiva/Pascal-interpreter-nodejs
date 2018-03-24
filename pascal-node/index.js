// console.log(Date())
const fileUtils = require('./src/utils/file-utils')
const lexer = require('./src/lexical/lexer')
const parser = require('./src/lexical/parser')
const fileData = fileUtils.readFile()

let words = lexer(fileData)
parser(words)
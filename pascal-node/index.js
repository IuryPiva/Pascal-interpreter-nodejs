console.log(Date())
const fileUtils = require('./src/utils/file-utils')
const lexer = require('./src/lexical/lexer')
const parser = require('./src/lexical/parser')
const fileData = fileUtils.readFile()

console.log('Input: ', fileData, 'End of input.')
let tokens = lexer(fileData)
console.log('Lexer', tokens)
// console.log('Parser', parser(tokens))
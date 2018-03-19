// const fileUtils = require('./src/file-utils')
const inputFile = process.argv.slice(2)[0]
if(!inputFile) {
    console.log('Insira um caminho para o arquivo a ser compilado ex: node index.js ./mytext.txt')
    return 
}
const textUtils = require('./src/text-utils')
const tokenTypes = require('./src/token-types')

const path = require('path')
const fs = require('fs')

let fileData = fs.readFileSync(inputFile, 'utf8')
let info = {
    row: 1,
    token: '',
    value: ''
}
let tokens = []
let pointer = ''

const handleSpace = function (value, info) {
    console.log('space', value, info.row)
}
const handleNewLine = function (value, info) {
    info.row++
    console.log('NewLine', value, info.row)
}
const handleNumeric = function (value, info) {
    console.log('Numeric', value, info.row)
}
const handleValidLetter = function (value, info) {
    console.log('ValidLetter', value, info.row)
}
const mayBeDoubleCharOperator = function (value, info) {
    if(value == '>') {
        return true
    }if(value == '<') {
        return true      
    }if(value == ':') {
        return true
    }if(value == '.') {
        return true        
    }// IF THE REGEX TO REMOVE COMMENTS ISN'T ALLOW WE SHOULD INCLUDE COMMENTS HERE
}
const handleOperator = function (value, info) {
    pointer += value + '';
    if(mayBeDoubleCharOperator(pointer)) {

    } else {
        console.log('Operator', tokenTypes.operators[value])
        setNextToken()
    }
}
const handleQuote = function (value, info) {
    console.log('Quote', value, info.row)
}
const isValidLetter = function (value, info) {
    var asciiCode = value.charCodeAt()
    var result = (asciiCode >= 65 && asciiCode <= 90)
    return result;
}
const isNumeric = function (value, info) {
    var result = !isNaN(value - parseFloat(value, info))
    return result;
}
const isOperator = function (value, info) {
    return (value in tokenTypes.operators)
}

const space = ' '
const newLine = '\n'
const quote = "'"

fileData.split("").map(
    (value, index) => {
        let upperValue = value.toUpperCase()
        if (upperValue == space) {
            handleSpace(upperValue)
        } else

        if (upperValue == newLine) {
            handleNewLine(upperValue)
        } else

        if (isValidLetter(upperValue)) {
            handleValidLetter(upperValue)
        } else

        if (isNumeric(upperValue)) {
            handleNumeric(upperValue)
        } else

        if (upperValue == quote) {
            handleQuote(upperValue)
        } else

        if (isOperator(upperValue)) {
            handleOperator(upperValue)
        }
    }
)
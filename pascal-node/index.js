// const fileUtils = require('./src/file-utils')
const inputFile = process.argv.slice(2)[0]
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

const handleSpace = function (value) {
    console.log('space', value, info.row)
}
const handleNewLine = function (value) {
    info.row++
    console.log('NewLine', value, info.row)
}
const handleNumeric = function (value) {
    console.log('Numeric', value, info.row)
}
const handleValidLetter = function (value) {
    console.log('ValidLetter', value, info.row)
}
const handleOperator = function (value) {
    console.log('Operator', tokenTypes.operators[value])
}
const handleQuote = function (value) {
    console.log('Quote', value, info.row)
}
const isValidLetter = function (value) {
    var asciiCode = value.charCodeAt()
    var result = (asciiCode >= 65 && asciiCode <= 90)
    return result;
}
const isNumeric = function (value) {
    var result = !isNaN(value - parseFloat(value))
    return result;
}
const isOperator = function (value) {
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
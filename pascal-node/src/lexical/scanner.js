const tokenTypes = require('./token-types')
const identifiers = require('./automata/identifiers')
const numerics = require('./automata/numerics')
const operators = require('./automata/operators')

let info = {
    row: 1,
    token: '',
    value: ''
}
let tokens = []
const space = ' '
const newLine = '\n'
const quote = "'"

const handleSpace = function (value, info) {
    console.log('space', value, info.row)
}
const handleNewLine = function (value, info) {
    info.row++
    console.log('NewLine', value, info.row)
}
module.exports = {
    index = function (data) {
        data.map(
            (value, index) => {
                let upperValue = value.toUpperCase()
                if (upperValue == space) {
                    handleSpace(upperValue)
                } else if (upperValue == newLine) {
                    handleNewLine(upperValue)
                } else if (identifiers.isValidLetter(upperValue)) {
                    identifiers.handleValidLetter(upperValue)
                } else if (numerics.isNumeric(upperValue)) {
                    numerics.handleNumeric(upperValue)
                } else if (upperValue == quote) {
                    operators.handleQuote(upperValue)
                } else if (operators.isOperator(upperValue)) {
                    operators.handleOperator(upperValue)
                }
            }
        )

    }

}
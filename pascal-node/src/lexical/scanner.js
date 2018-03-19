const tokenTypes = require('./token-types')

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
[1,2,3,4,5,6]
 0,1
module.exports = {
    index = function (data) {
        data.map(
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

    }

}
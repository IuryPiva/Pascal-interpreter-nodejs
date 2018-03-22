module.exports = {
    mayBeDoubleCharOperator: function (value, info) {
        if (value == '>') {
            return true
        } if (value == '<') {
            return true
        } if (value == ':') {
            return true
        } if (value == '.') {
            return true
        }// IF THE REGEX TO REMOVE COMMENTS ISN'T ALLOW WE SHOULD INCLUDE COMMENTS HERE
    },
    handleOperator: function (value, info) {
        pointer += value + '';
        if (mayBeDoubleCharOperator(pointer)) {

        } else {
            // console.log('Operator', tokenTypes.operators[value])
            setNextToken()
        }
    },
    handleQuote: function (value, info) {
        // console.log('Quote', value, info.row)
    },
    isOperator : function (value, info) {
        return (value in tokenTypes.operators)
    }
}
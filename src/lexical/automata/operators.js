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
        info.token += value + '';
        if (mayBeDoubleCharOperator(info.token)) {
        } else {
            if(tokenTypes.operators[value]) {
                console.log('Operator', tokenTypes.operators[value])
            }
        }
    },
    handleQuote: function (value, info) {
        // console.log('Quote', value, info.row)
    },
    isOperator : function (value, info) {
        return (value in tokenTypes.operators)
    }
}
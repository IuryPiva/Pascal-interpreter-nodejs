const tokenTypes = require('../utils/token-types')
module.exports = function (tokens) {
    let parserStack = [{token: tokenTypes.getToken('PROGRAMA'), word: 'PROGRAMA'}]
    return tokens
}
const tokenTypes = require('../utils/token-types')
const parserMatrix = require('../utils/parser-matrix')

module.exports = function (tokenStack) {
    let derivateStack = [{token: tokenTypes.getToken('PROGRAMA'), word: 'PROGRAMA'}]
    while (derivateStack.length > 0) {
        const derivate = derivateStack[0]
        const entry = tokenStack[0]

        if(tokenTypes.isTerminal(x)) {
            if(derivate == entry) {
                derivateStack.shift()
                tokenStack.shift()
            } else {
                console.log('Deu erro maluko')
                return
            }
        } else {
            const derivation = parserMatrix.getDerivation(derivate, entry)
            if(derivation) {
                derivate.shift()
                derivateStack.unshift(derivation)
            } else {
                console.log('Deu erro maluko')
                return
            }
        }
        
    }
    return tokenStack
}
const tokenTypes = require('../utils/token-types')
let level = 0
let category = ""
let endToken = false
let identifiers = []

module.exports = function (tokenStack) {

    function identifierExists(newIdentifier, level) {
        identifiers.forEach(identifier => {
            if (newIdentifier.word == identifier.word && identifier.level <= level) {
                return true
            }

        })
        return false
    }

    function removeByLevel(l) {
        for (let i = 0; i < identifiers.length - 1; i++) {

            if (identifiers[i].level == l) {
                identifiers.splice(i, 1)

            }
        }
    }



    let index = 0
    tokenStack.forEach(token => {

        if (token.word.toLowerCase() == 'program' || token.word.toLowerCase() == 'case' || token.word.toLowerCase() == 'procedure' || token.word.toLowerCase() == 'if' || token.word.toLowerCase() == 'while' || token.word.toLowerCase() == 'for') {
            level++
        } if (token.word.toLowerCase() == 'end') {
            endToken = true
        } if (token.word.toLowerCase() == ';' && endToken == true) {
            removeByLevel(level)
            level--
            endToken = false
        } if(token.word.toLowerCase() != 'end'){
            endToken = false
        } if (tokenTypes.isCategory(token.token)) {
            category = token.word
        } if (token.word == ';' || token.word == '(') {
            category = ""
        } if (tokenTypes.isIdentifier(token.token)) {
            if (category != "") {
                tokenStack[index].category = category
                identifiers.push({ token, level })
            } else {
                if (identifierExists(token, level)) {
                    console.log("identificador existe")
                } else {
                    console.log("identificador nao existe")
                }
            }
        }
        index++
    });
    console.log('level final é: ' + level)
    console.log(identifiers)
}

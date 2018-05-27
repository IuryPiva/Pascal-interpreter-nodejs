const tokenTypes = require('../utils/token-types')
let level = -1
let category = ""
let identifiers = []
let lastToken
let tokenLevel = []
let lastLevel = ""
let begin = false
let end = false
let index = 0

let arrayToken = false
let arrayVar = []

module.exports = function (tokenStack) {

    function identifierExists(newIdentifier, level) {

        let even = function (element) {
            return newIdentifier.word.toLowerCase() == element.token.word.toLowerCase() && element.level <= level
        }

        if (identifiers.some(even)) {
            return true
        } else {
            return false
        }


    }

    function removeByLevel(l) {
        
        for (let i = 0; i < identifiers.length; i++) {

            if (identifiers[i].level == l) {

                identifiers.splice(i, 1)


            }
        }
    }

    function returnLastLevel(array) {
        return array[array.length - 1]
    }

    function verifyInteger() {
        if (tokenStack[index + 1].word.toLowerCase() == '=' && tokenStack[index + 2].token == '26') {
            return true

        } else {
            return false
        }

    }

    function verifyArrray(token) {
        debugger
        let l = index

        while (tokenStack[l].word != ';') {
            if (tokenStack[l].token == '25') {
                arrayVar.push(tokenStack[l])
            }
            l--
        }



        arrayVar.forEach(token => {
            token.category = 'array'
            token.type = 'integer'
            identifiers.push({ token, level })
        });

    }

    function verifyType(token) {
        if (token.category == 'const') {
            if (verifyInteger()) {
                // console.log('verify é true')
                // console.log('é inteiro')

            }
        }
    }

    function identifierDeclaration(token) {
        if (tokenTypes.isIdentifier(token.token)) {


            tokenStack[index].category = category.toLowerCase()
            identifiers.push({ token, level })
            verifyType(token)

        }
    }

    tokenStack.forEach(token => {

        if (token.word.toLowerCase() == 'program' || token.word.toLowerCase() == 'case' || token.word.toLowerCase() == 'procedure' || token.word.toLowerCase() == 'if' || token.word.toLowerCase() == 'while' || token.word.toLowerCase() == 'for') {
            level++
            tokenLevel.push(tokenTypes.isTokenLevel(token.token))

        }

        if (returnLastLevel(tokenLevel) == 'program') {

            if (token.word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == '.') {
                removeByLevel(level)
                level--
                tokenLevel.pop()

                return
            }
        }

        if (returnLastLevel(tokenLevel) == 'while') {
            if (token.word.toLowerCase() == 'begin' && tokenStack[index + 1].word.toLowerCase() == 'begin') {
                end = true
            }
            if (end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                end = false

            }
            if (!end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                removeByLevel(level)
                level--
                tokenLevel.pop()
                index++
                return

            }
        }

        if (returnLastLevel(tokenLevel) == 'if') {            
            if (token.word.toLowerCase() == 'begin' && tokenStack[index + 1].word.toLowerCase() == 'begin') {
                end = true
            }
            if (end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                end = false

            }
            if (!end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                removeByLevel(level)
                level--
                tokenLevel.pop()
                index++
                return
            }
        }

        if (returnLastLevel(tokenLevel) == 'for') {

            if (token.word.toLowerCase() == 'begin' && tokenStack[index + 1].word.toLowerCase() == 'begin') {
                end = true
            }
            if (end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                end = false

            }
            if (!end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                removeByLevel(level)
                level--
                tokenLevel.pop()
                index++
                return
            }
        }

        if (returnLastLevel(tokenLevel) == 'procedure') {

            if (token.word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                end = true
            }
            if (end && token.word.toLowerCase() == 'begin') {
                end = false
                removeByLevel(level)
                level--
                tokenLevel.pop()
                index++
                return

            }
        }

        if (returnLastLevel(tokenLevel) == 'case') {

            if (token.word.toLowerCase() == 'begin' && tokenStack[index + 1].word.toLowerCase() == 'begin') {
                end = true
            }
            if (end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                end = false

            }
            if (!end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == 'end') {
                removeByLevel(level)
                level--
                tokenLevel.pop()
                index++
                return
            }
        }

        if (tokenTypes.isCategory(token.token)) {
            category = token.word.toLowerCase()
        }

        if (category != '') {

            if (category == 'label') {
                if (token.token != "47") {
                    identifierDeclaration(token)
                } else {
                    category = ''
                }
            }

            if (category == 'const') {
                if (token.token != "4") {
                    identifierDeclaration(token)
                } else {
                    category = ''
                }
            }

            if (category == 'var') {
                if (token.word.toLowerCase() != 'begin' && token.word.toLowerCase() != 'procedure') {
                    identifierDeclaration(token)
                } else {
                    category = ''
                }
            }

            if (category == 'procedure') {
                if (token.token != "36") {
                    level--
                    identifierDeclaration(token)
                    level++
                } else {
                    category = ''
                }
            }

            if (category == 'program') {

                if (token.token != ";") {
                    identifierDeclaration(token)
                } else {
                    category = ''

                }
            }
        }

        if (tokenTypes.isIdentifier(token.token) && category == '') {

            if (identifierExists(token, level)) {

            } else {
                console.log(token)
                console.log("identificador nao existe")
            }

        }

        index++
        
    });

    level = -1
    index = 0
    
}

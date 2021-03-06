const tokenTypes = require('../utils/token-types')

module.exports = function (tokenStack, socket) {

    const errors = []
    let category = ""
    let identifiers = []
    let level = -1
    let lastToken
    let tokenLevel = []
    let lastLevel = ""
    let begin = false
    let end = false
    let index = 0
    let arrayToken = false
    let arrayVar = []

    function identifierExists(newIdentifier, level) {

        let even = function (element) {
            return newIdentifier.word.toLowerCase() == element.token.word.toLowerCase() && element.level <= level
        }

        if (identifiers.some(even)) {
            return true
        } else {
            errors.push('Error: Identifier: ' + newIdentifier.word + ' does not exist in this scope')
        }


    }

    function validParameters(token) {
        arr = ['25', '26', '37', '36', '32', '33', '30', '43', '45', '44', '40', '41', '42']

        return arr.find(element => (token == element))
    }

    function procedureCall(token) {
        let tk
        if (tokenTypes.isIdentifier(token.token)) {
            if (tk = returnIdentifier(token)) {
                l = index + 1
                if (tk.token.category == 'procedure') {
                    while (tokenStack[l].token != '47' && tokenStack[l].token != '7') {
                        if (tokenStack[l].token == '25') {
                            tk = returnIdentifier(tokenStack[l])
                            if (tk.token.category == 'label') {
                                errors.push('Error: Invalid parameter at procedure ' + token.word + '. At line ' + token.line)
                            }

                        } else if (!validParameters(tokenStack[l].token)) {
                            errors.push('Error: Invalid parameter at procedure ' + tokenStack[l].word + '. At line ' + tokenStack[l].line)
                        }
                        l++
                    }
                }
            }
        }

    }

    function isAttribution(token) {
        if (token == '38') {
            return true
        } else {
            return false
        }
    }

    function returnIdentifier(token) {
        let rola = function (element) {
            if (token.word.toLowerCase() == element.token.word.toLowerCase() && element.level <= level) {
                return true
            } else {
                return false
            }
        }

        if (identifiers.find(rola)) {
            return identifiers.find(rola)
        } else {
            errors.push('Error: Identifier: ' + token.word + ' does not exist in this scope. At line: ' + token.line)
        }
    }

    function duplicateIdentifier(token) {

        if (identifiers.some(element => (token.word.toLowerCase() == element.token.word.toLowerCase() && element.level == level))) {
            errors.push('Error: Duplicate identifier: ' + token.word + ' - at line: ' + token.line)
            return true
        } else {
            return false
        }
    }

    function duplicateProcedure(token) {
        if (identifiers.some(element => (token.word.toLowerCase() == element.token.word.toLowerCase() && element.token.category == 'procedure'))) {
            errors.push('Error: Procedure: ' + token.word + ' was already declared - at line: ' + token.line)
            return true
        } else {
            return false
        }

    }

    function removeByLevel(l) {
        for (let i = identifiers.length - 1; i > 0; i--) {

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

    function verifyVar(token) {

        let l = index
        let type = ''
        while (tokenStack[l].word != ';') {
            if (tokenStack[l].token == '8') {
                type = 'integer'
            } else if (tokenStack[l].token == '9') {
                type = 'array'
                break

            }
            l++
        }
        return type

    }

    function verifyArray() {
        arr = ['26', '25', '34']

        
        let i = index
        while(tokenStack[i].token != '35'){
            debugger
            if(!arr.some(element => (tokenStack[i].token == element))){
                errors.push('Error: Invalid array atribution at line: ' + tokenStack[i].line + '. You should specify an index.')
            }
            i++
        }
    }

    function verifyAttribution() {
        arr = ['25', '26', '37', '36', '32', '33', '30', '43', '45', '44', '40', '41', '42']
        l = index + 1
        while (tokenStack[l].token != '47' && tokenStack[l].token != '28' && tokenStack[l].token != '6') {
            if (!arr.some(element => (tokenStack[l].token == element))) {
                errors.push('Error: Invalid attribution at line: ' + tokenStack[l].line + '. Identifier: ' + tokenStack[l].word + ' is declared as integer')
            }
            l++
        }
    }

    function identifierDeclaration(token) {

        if (tokenTypes.isIdentifier(token.token)) {


            tokenStack[index].category = category.toLowerCase()
            identifiers.push({ token, level })


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

        else if (returnLastLevel(tokenLevel) == 'while') {
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

        else if (returnLastLevel(tokenLevel) == 'if') {
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

        else if (returnLastLevel(tokenLevel) == 'for') {

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

        else if (returnLastLevel(tokenLevel) == 'procedure') {

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

        else if (returnLastLevel(tokenLevel) == 'case') {

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
            } else if (category == 'const') {
                if (token.token != "4") {
                    if (verifyInteger()) {
                        token.type = 'integer'
                    }
                    identifierDeclaration(token)
                } else {
                    category = ''
                }
            } else if (category == 'var') {
                if (token.word.toLowerCase() != 'begin' && token.word.toLowerCase() != 'procedure') {

                    if (!duplicateIdentifier(token)) {
                        if (tokenTypes.isIdentifier(token.token)) {
                            token.type = verifyVar(token)
                            identifierDeclaration(token)
                        }
                    }

                } else {
                    category = ''
                }
            } else if (category == 'procedure') {
                if (token.token == "25" && tokenStack[index + 1].token == "36") {
                    if (!duplicateProcedure(token)) {
                        level--
                        identifierDeclaration(token)
                        level++
                    }
                } else if (token.token == "25" && tokenStack[index + 1].token == "39") {
                    if (!duplicateIdentifier(token)) {
                        if (tokenTypes.isIdentifier(token.token)) {
                            token.type = 'integer'
                            identifierDeclaration(token)
                        }
                    } else {
                        category = ''
                    }
                }
            } else if (category == 'program') {

                if (token.token != ";") {
                    identifierDeclaration(token)
                } else {
                    category = ''

                }
            }
        }

        if (tokenTypes.isIdentifier(token.token) && category == '') {
            if (procedureCall(token)) {
            }
            else {
                if(identifierExists(token, level)) {
                   let tk = returnIdentifier(token)
                    if(tk.token.type == 'array'){
                        verifyArray()
                    }
                }
            }
        } else if (isAttribution(token.token)) {
            verifyAttribution()
        }


        index++


    });

    return errors

}

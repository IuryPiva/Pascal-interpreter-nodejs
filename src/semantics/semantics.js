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
        for (let i = 0; i < identifiers.length; i++) {

            if (identifiers[i].level == l) {
                identifiers.splice(i, 1)

            }
        }
    }

    function typeVerification(token) {
    }

    function returnLastLevel(array) {
        return array[array.length - 1]
    }

    
    

    
    tokenStack.forEach(token => {

        if (token.word.toLowerCase() == 'program' || token.word.toLowerCase() == 'case' || token.word.toLowerCase() == 'procedure' || token.word.toLowerCase() == 'if' || token.word.toLowerCase() == 'while' || token.word.toLowerCase() == 'for') {
            level++
            tokenLevel.push(tokenTypes.isTokenLevel(token.token))

        }

        if(returnLastLevel(tokenLevel) == 'program') {
            
            if( token.word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == '.') {
                level --
                removeByLevel(level)
                tokenLevel.pop()
                
                return
            }
        }

        if(returnLastLevel(tokenLevel) == 'while') {
            if(token.word.toLowerCase() == 'begin' && tokenStack[index + 1].word.toLowerCase() == 'begin') {
                end = true 
            }
            if(end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';'){
                end = false

            }
            if( !end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                debugger
                level --
                removeByLevel(level)
                tokenLevel.pop()
                index++
                return
                
            }
        }

        if(returnLastLevel(tokenLevel) == 'if') {
            
            if(token.word.toLowerCase() == 'begin' && tokenStack[index + 1].word.toLowerCase() == 'begin') {
                end = true 
            }
            if(end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';'){
                end = false

            }
            if( !end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                level --
                removeByLevel(level)
                tokenLevel.pop()
                index++
                return
            }
        }

        if(returnLastLevel(tokenLevel) == 'for') {
            
            if(token.word.toLowerCase() == 'begin' && tokenStack[index + 1].word.toLowerCase() == 'begin') {
                end = true 
            }
            if(end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';'){
                end = false

            }
            if( !end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                level --
                removeByLevel(level)
                tokenLevel.pop()
                index++
                return
            }
        }

        if(returnLastLevel(tokenLevel) == 'procedure') {
            
            if(token.word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';') {
                end = true 
            }
            if(end && token.word.toLowerCase() == 'begin'){
                end = false
                level --
                removeByLevel(level)
                tokenLevel.pop()
                index++
                return

            }
        }

        if(returnLastLevel(tokenLevel) == 'case') {
            
            if(token.word.toLowerCase() == 'begin' && tokenStack[index + 1].word.toLowerCase() == 'begin') {
                end = true 
            }
            if(end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == ';'){
                end = false

            }
            if( !end && tokenStack[index].word.toLowerCase() == 'end' && tokenStack[index + 1].word.toLowerCase() == 'end') {
                level --
                removeByLevel(level)
                tokenLevel.pop()
                index++
                return
            }
        }
        
        
        // if (token.word.toLowerCase() == 'end') {

        //     removeByLevel(level)
        //     level--

        // }



        if (tokenTypes.isCategory(token.token)) {
            category = token.word
        }

        if (token.word == ';' || token.word == '(') {
            category = ""
        }

        if (tokenTypes.isIdentifier(token.token)) {
            if (category != "") {
                tokenStack[index].category = category
                identifiers.push({ token, level })
            } else {
                if (identifierExists(token, level)) {
                    //console.log("identificador existe")
                } else {
                    // console.log("identificador nao existe")
                }
            }
        }
        index++


    });
    console.log(level)
    level = -1
    index = 0
}

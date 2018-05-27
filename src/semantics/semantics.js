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

  function identifierExists(newIdentifier, level){
      
    identifiers.forEach(element => {
        debugger
        if (newIdentifier.word.toLowerCase() == element.token.word.toLowerCase() && element.level <= level) {
            return true
        } else {
            return false
        }
      });
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
    
    function verifyInteger(){
        if(tokenStack[index+1].word.toLowerCase() == '=' && tokenStack[index +2].token == '26'){
            return true
            
        } else {
            return false
        }
        
    }

    function verifyArrray(token){
        debugger
        let l = index
                
                while(tokenStack[l].word != ';'){
                    if(tokenStack[l].token == '25'){
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
        if(token.category == 'const') {
            if(verifyInteger()){
                console.log('verify é true')
                console.log('é inteiro')
                
            }
        }
    }

    function identifierDeclaration(token) {
        if (tokenTypes.isIdentifier(token.token)) {

            if (identifierExists(token, level)) {
                console.log('entrou')
                verifyType(token)
                console.log("identificador existe")
            } else {
                tokenStack[index].category = category.toLowerCase()
                identifiers.push({ token, level })
                verifyType(token)
            }
        }
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
        
        if (tokenTypes.isCategory(token.token)) {
            category = token.word
        }

        if (token.word == ';' || token.word == '(') {
            category = ""
        }

        if(token.token == '9') {
            
            verifyArrray(token)
        }

        if (tokenTypes.isIdentifier(token.token)) {
            if (category != "") {
                tokenStack[index].category = category.toLowerCase()
                identifiers.push({ token, level })
                verifyType(token)
                

            } else {
                if (identifierExists(token, level)) {
                    console.log('entrou')
                    verifyType(token)
                    console.log("identificador existe")
                } else {
                    console.log("identificador nao existe")
                }
            }
        }
        index++
        




    });
    
    
    level = -1
    index = 0
}

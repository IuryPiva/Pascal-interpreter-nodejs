const tokenTypes = require('../utils/token-types')
let level = 0
let category = ""
let identifiers = []

module.exports = {


    identifierExists: function (identifiers, newIdentifier) {
        identifiers.forEach(identifier => {
            if (identifier.word == newIdentifier.word) {
                return
            } else {
                console.log("identifier not declared")
                return false
            }
        });

    },

    removeByLevel: function (level) {
        for (let index = 0; index < identifiers.length; index++) {
            if (identifiers[index].level == level) {
                delete identifiers[index]
            }

        }
    },

    insertidentifier: function (token) {

        if (token.word.toLowerCase() == 'program' || token.word.toLowerCase() == 'procedure' || token.word.toLowerCase() == 'if' || token.word.toLowerCase() == 'while' || token.word.toLowerCase() == 'for') {
            level++
        } if (token.word.toLowerCase() == 'end') {
            level--
        }
        if (tokenTypes.isCategory(token)) {
            category = token.word
        } if (token.word == ';') {
            category = ""
        }
        if (tokenTypes.isIdentifier(token)) {
            if (category != "") {
                token.category = category
                identifiers.push({ token, level: level })
            }
        }
    }


    // tokenStack.forEach(token => {
    //     if(token.word.toLowerCase() == 'program' || token.word.toLowerCase() == 'procedure' || token.word.toLowerCase() == 'if' || token.word.toLowerCase() == 'while' || token.word.toLowerCase() == 'for'){
    //         level ++
    //     }  if(token.word.toLowerCase() == 'end'){
    //         level --
    //     }
    //      if(tokenTypes.isCategory(token)){
    //             category = token.word
    //     }  if(token.word == ';') {
    //         category = ""
    //     }
    //      if(tokenTypes.isIdentifier(token)){
    //         if(category != ""){                 
    //         tokenStack[index].category = category
    //         identifiers.push({token, level : level})
    //         }
    //     }
    //     index++
    // });    



}

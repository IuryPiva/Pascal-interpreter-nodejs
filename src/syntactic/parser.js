const tokenTypes = require('../utils/token-types')
const parserMatrix = require('../utils/parser-matrix')

module.exports = function (tokenStack) {
  let tokenStackTipos = tokenStack  
  if(tokenStack.length == 0) {
    return [{ error: `Error - empty program`}]
  }
  var erros = [];
  // DERIVATE É X // ENTRY É A
  let derivateStack = [{
    token: tokenTypes.getToken('PROGRAMA'),
    word: 'PROGRAMA'
  }]
  while (derivateStack.length > 0) {
    const derivate = derivateStack[0]
    const entry = tokenStack[0]

    if (tokenTypes.isTerminal(derivate.token)) {
      if (derivate.token == entry.token) {
        derivateStack.shift()
        tokenStack.shift()
      } else {
        erros.push({ error : `Error on line: ${entry.line} - ${entry.word} is expected and ${derivate.word} was found`})
         
        return erros
      }
    } else {
      if (!entry) {
        erros.push({ errror : `Unexpected end of file. ${derivate.word} expected.`})
        return erros
      }
      
      const derivations = parserMatrix.getDerivation(derivate.token, entry.token)
      
      if(derivations == "NULL"){
        derivateStack.shift();
      } else if (derivations) {
        derivateStack.shift()
        let auxStack = []
        derivations.map(element => {
          auxStack.push(tokenTypes.derivationToDerivate(element))
        });
        derivateStack = auxStack.concat(derivateStack)
      } else {
        
        erros.push({ error: `Error - Unexpected ${entry.word} on line: ${entry.line}`})
        return erros
      }
    }
  }
  
  return {success: 'Successfully compiled'}
}
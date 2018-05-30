const tokenTypes = require('../utils/token-types')
module.exports = function (words, socket) {
  let row = 1;
  let tokens = []
  let category = '';
  let insideComment = false
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (word == '\n') {
      row++
    } else if(word == '(*' || word == '*)') {
      insideComment = !insideComment
    } else if(insideComment) {
      // ignore everything inside comments except new lines and close comments
    } else if (tokenTypes.keywords.hasOwnProperty(word.toLowerCase())) {
     // IF IS KEYWORD
      tokens.push({
        word: word,
        line: row,
        token: tokenTypes.keywords[word.toLowerCase()]
      })
      
    } else if (!isNaN(word - parseFloat(word))) {
      // IF IS NUMERIC
      if (word * 1 > 32767 || word * 1 < -32767) {
        socket.emit('lexerError','Error: '+ word+ ' is out of range. Numbers should be at the range of -32767 and 32767.')
        return        
      } else {
        tokens.push({
          word: word,
          line: row,
          token: "26"
        })
        // console.log(word, 'at line: ' + row, 'token: ' + 26)
      }
    } else {
      if (!isNaN(word[0] - parseFloat(word[0]))) {
        
        socket.emit('lexerError','Error: '+ word+ ' is not a valid identifier, it should not start with a number.')
        return
      } else if (word[0] == '\'') {
        if (word.length > 256) {
          socket.emit('lexerError','Error: '+ word+ ' is too large. Comments should have a max of 255 characters.')
          return          
        } else if (word[word.length - 1] != '\'') {
          socket.emit('lexerError','Error comment starting on line: ' + row + '  does not have an end')
          return
        } else {
          tokens.push({
            word: word,
            line: row,
            token: "48"
          })
          // console.log(word, 'at line: ' + row, 'token: ' + 48)
        }
      } else if (word.length > 30) {
          socket.emit('lexerError','Error:', word, 'is too large. Identifiers should have a max of 30 characters.')
          return          
      } else {
        
        
        tokens.push({
          word: word,
          line: row,
          token: "25"
        
        })
      
      }
    }
  }
  return tokens
}
const tokenTypes = require('../utils/token-types')
module.exports = function (words) {
  console.log(words)
  for (let i=0; i< words.length; i++) {
    const word = words[i]
    if (tokenTypes.keywords.hasOwnProperty(word.toLowerCase())) {
      console.log(word, tokenTypes.keywords[word])
    } else if(word) {

    }
  }
}
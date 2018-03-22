const tokenTypes = require('../utils/token-types')
module.exports = function (words) {
  // console.log(words)
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (tokenTypes.keywords.hasOwnProperty(word.toLowerCase())) {
      // IF IS KEYWORD
      // console.log(word, tokenTypes.keywords[word])
    } else if (!isNaN(word - parseFloat(word))) {
      // IF IS NUMERIC
      if (word * 1 > 32767 || word * 1 < -32767) {
        // console.log('Error:', word, 'is out of range. Numbers should be at the range of -32767 and 32767.')
      } else {
        // console.log(word, 26)
      }
    } else {
      if (!isNaN(word[0] - parseFloat(word[0]))) {
        // console.log('Error:', word, 'is not a valid identifier, it should not start with a number.')
      } else if (word.length > 30) {
        // console.log('Error:', word, 'is too large. Identifiers should have a max of 30 characters.')
      } else {
        // console.log(word, 25)
      }
    }
  }
}
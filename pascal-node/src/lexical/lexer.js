const split = require('split-string');

function replaceOperators(text) {
  return text
    .replace(/\+/g, ' + ')
    .replace(/\*/g, ' * ')
    .replace(/\=/g, ' = ')
    .replace(/\-/g, ' - ')
    .replace(/\,/g, ' , ')
    .replace(/\;/g, ' ; ')
    .replace(/\:/g, ' : ')
    .replace(/\./g, ' . ')
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .replace(/\[/g, ' [ ')
    .replace(/\]/g, ' ] ')
    .replace(/\//g, ' / ')
    .replace(/\</g, ' < ')
    .replace(/\>/g, ' > ')
    .replace(/\$/g, ' $ ')
    .replace(/\:  \=/g, ' := ')
    .replace(/\.  \./g, ' .. ')
    .replace(/\<  \>/g, ' <> ')
    .replace(/\<  \=/g, ' <= ')
    .replace(/\>  \=/g, ' >= ')
    .replace(/\r\n/g, ' \r\n ')
}

module.exports = function (code) {
  return split(replaceOperators(code), {
    brackets: {
      '\'': '\''
    },
    keepQuotes: true,
    separator: ' '
  }).filter(String);
}
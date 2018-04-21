const split = require('split-string');

function replaceOperators(text) {
  return text
    .replace(/\(\*(.*?)\*\)/g, '')
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
    .replace(/\r\n/g, ' \n ')
    .replace(/\n/g, ' \n ')
}

module.exports = function (code) {
  return split(replaceOperators(code), {
    separator: ' '
  }).filter(String);
}
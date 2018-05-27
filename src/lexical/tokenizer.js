const split = require('split-string');

function replaceOperators(text) {
  return text
  .replace(/\+/g, ' + ')
  .replace(/\*/g, ' * ')
  .replace(/\=/g, ' = ')
  .replace(/\-(?!\d)/g, ' - ')
  .replace(/\,/g, ' , ')
  .replace(/\;/g, ' ; ')
  .replace(/\:/g, ' : ')
  .replace(/\./g, ' . ')
  .replace(/\(/g, ' ( ')
  .replace(/\)/g, ' ) ')
  .replace(/\[/g, ' [ ')
  .replace(/\]/g, ' ] ')
  .replace(/\//g, ' / ')
  .replace(/\<(?!\>)/g, ' < ')
  .replace(/\>/g, ' > ')
  .replace(/\$/g, ' $ ')
  .replace(/\:  \=/g, ' := ')
  .replace(/\.  \./g, ' .. ')
  .replace(/\< \>/g, ' <> ')
  .replace(/\<  \=/g, ' <= ')
  .replace(/\>  \=/g, ' >= ')
  .replace(/\r\n/g, ' \n ')
  .replace(/\n/g, ' \n ')
  .replace(/\t/g, '')
  .replace(/\(  \*/g, ' (* ')
  .replace(/\*  \)/g, ' *) ')
}

module.exports = function (code) {
  return split(replaceOperators(code), {
    separator: ' ',
    keepQuotes: true
  }).filter(String);
}
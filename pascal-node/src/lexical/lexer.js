function replaceOperators(text) {
  return text
    .replace(/\+/g, ' + ')
    .replace(/\*/g, ' * ')
    .replace(/\=/g, ' = ')
    .replace(/\-/g, ' - ')
    .replace(/\-  \- /g, '- -')
    .replace(/\+  \- /g, '+ -')
    .replace(/\=  \- /g, '= -')
    .replace(/\*  \- /g, '* -')
    .replace(/\/  \- /g, '/ -')
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
}

module.exports = function (code) {
  console.log('replace', replaceOperators(code))
  return replaceOperators(code).split(/[(\r\n) ]/g).filter(String);
}
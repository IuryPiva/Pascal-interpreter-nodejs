console.log(Date())
const fileUtils = require('./src/file-utils')
const fileData = fileUtils.readFile()


const textUtils = require('./src/text-utils')
const tokenTypes = require('./src/token-types')

textUtils.getCharacters(fileData)
const inputFile = process.argv.slice(2)[0]
const fs = require('fs')
module.exports = {
    readFile: function () {
        if(!inputFile) {
            // console.log('No input file found, please inform the file to be compiled. E.g.: node index.js path/to/file.extension')
            return
        }
        let fileData = fs.readFileSync(inputFile, 'utf8')
        return fileData
    }
}
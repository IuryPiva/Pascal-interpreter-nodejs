const inputFile = process.argv.slice(2)[0]
const fs = require('fs')
module.exports = {
    readFile: function () {
        let fileData = fs.readFileSync(inputFile, 'utf8')
        return fileData.split("")
    }
}
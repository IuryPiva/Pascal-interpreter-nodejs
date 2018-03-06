// const fileUtils = require('./src/file-utils')
const inputFile = process.argv.slice(2)[0]
const textUtils = require('./src/text-utils')

const path = require('path')
const fs = require('fs')

const fileUtils = {
    getFileText: async (filepath) => {
        console.log('fileutils 6' , filepath)
        await fs.readFileSync(filepath, 'utf8',(err, data) => {
            if (err) throw err
            console.log(data)
            return data
        })
    },
    getFilePath: (dir, filename) => {
        return path.join(dir, filename)
    }
}


fileUtils.getFileText(fileUtils.getFilePath(__dirname, inputFile)).then((data) => {
    console.log(data)    
}, (err) => err)
// console.log(text)
// printArray(textUtils.getStackedWords(text))

function printArray(array) {
    for(let i = 0; i < array.length; i++) {
        var x = array.pop()
        console.log(x)
    }
}

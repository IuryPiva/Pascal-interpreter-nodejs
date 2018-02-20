const fs = require('fs')
let inputFile = 'olamundo.txt'
let outputText = null

fs.readFile(inputFile, 'utf8',(err, data) => {
    if (err) throw err
    next(data)
})

function next(text) {
    let wordsStack = text.split(' ').reverse()
    printArray(wordsStack)
}

function printArray(array) {
    for(let i = 0; i < array.length; i++) {
        var x = array.pop()
        console.log(x)
    }
}

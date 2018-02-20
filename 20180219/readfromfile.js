const fs = require('fs')
let inputFile = 'olamundo.txt'

fs.readFile(inputFile, 'utf8',(err, data) => {
    if (err) throw err
    console.log(data)
})
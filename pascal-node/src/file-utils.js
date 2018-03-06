const path = require('path')
const fs = require('fs')

module.exports = {
    getFileText: (filepath) => {
        console.log('fileutils 6' , filepath)
        fs.readFileSync(filepath, 'utf8',(err, data) => {
            if (err) throw err
            console.log(data)
            return data
        })
    },
    getFilePath: (dir, filename) => {
        return path.join(dir, filename)
    }
}
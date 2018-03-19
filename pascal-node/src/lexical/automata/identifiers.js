module.exports = {
    handleValidLetter: function (value, info) {
        console.log('ValidLetter', value, info.row)
    },
    isValidLetter: function (value, info) {
        var asciiCode = value.charCodeAt()
        var result = (asciiCode >= 65 && asciiCode <= 90)
        return result;
    }
}
module.exports = {
    getCharacters: function(text) {
        return text.split('').reverse()
    },
    removeComments: function(text) {
        return text.replace(/(\(\*(.*?)\*\))/gm, '');
    }
}
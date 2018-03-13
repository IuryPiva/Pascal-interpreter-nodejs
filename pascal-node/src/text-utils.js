module.exports = {
    getStackedWords: function(text) {
        return text.split(' ').reverse()
    },
    removeComments: function(text) {
        return text.replace(/(\(\*([\s\S]*?)\*\))/gm, '');
    }
}
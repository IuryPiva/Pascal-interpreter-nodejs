module.exports = {
    removeComments: function(text) {
        return replace(/(\(\*([\s\S]*?)\*\))/gm, '');
    }
}
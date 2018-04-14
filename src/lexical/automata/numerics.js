module.exports = {
    handleNumeric : function (value, info) {
        // console.log('Numeric', value, info.row)
        //TODO implemets integer automata
    },

    isNumeric : function (value) {
        var result = !isNaN(value - parseFloat(value))
        return result;
    }
}
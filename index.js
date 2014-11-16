var dE76 = require('./dE76');
var dE94 = require('./dE94');
var dE00 = require('./dE00');

module.exports = {
    getDeltaE76: function(lab1, lab2) {
        var deltaE = new dE76(lab1, lab2);
        return deltaE.getDeltaE();
    },
    getDeltaE94: function(lab1, lab2) {
        var deltaE = new dE94(lab1, lab2);
        return deltaE.getDeltaE();
    },
    getDeltaE00: function(lab1, lab2) {
        var deltaE = new dE00(lab1, lab2);
        return deltaE.getDeltaE();
    }
};
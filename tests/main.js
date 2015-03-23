var assert = require('assert');
var DeltaE = require('../src/index');

/**
 * Simple Mocha tests to verify dE values for each formula.
 * 
 * Run them over CLI:
 * $ mocha main.js
 */

var color1 = {
    L: 36,
    A: 60,
    B: 41
};

var color2 = {
    L: 55,
    A: 66,
    B: 77
};

describe('deltaE', function() {
    /**
     * CIE76 algorithm
     */
    describe('dE76', function() {
        /**
         * http://colormine.org/delta-e-calculator
         */
        it('Return correct DeltaE', function(done) {
            var result = DeltaE.getDeltaE76(color1, color2);
            var correctDeltaE = 41.14608122288197;

            assert.equal(result, correctDeltaE);
            done();
        });
    });
    
    /**
     * CIE94 algorithm
     */
    describe('dE94', function() {
        /**
         * http://colormine.org/delta-e-calculator/cie94
         */
        it('Return correct DeltaE', function(done) {
            var result = DeltaE.getDeltaE94(color1, color2);
            var correctDeltaE = 22.849281934529994;

            assert.equal(result, correctDeltaE);
            done();
        });
    });
    
    /**
     * CIE2000 algorithm
     */
    describe('dE00', function() {
        /**
         * http://colormine.org/delta-e-calculator/cie2000
         */
        it('Return correct DeltaE', function(done) {
            var result = DeltaE.getDeltaE00(color1, color2);
            var correctDeltaE = 22.394506952417895;

            assert.equal(result, correctDeltaE);
            done();
        });
    });
});
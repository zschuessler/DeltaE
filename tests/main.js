const assert = require('assert');
const DeltaE_Global = require('../dist/deltae.global.min');
const DeltaE_CommonJS = require('../src/index');

/**
 * Simple Mocha tests to verify dE values for each formula.
 *
 * Run them over CLI:
 * $ mocha main.js
 */

const color1 = {
  L: 36,
  A: 60,
  B: 41,
};

const color2 = {
  L: 55,
  A: 66,
  B: 77,
};

const floatingPointColor1 = {
  L: 53.23288178584245,
  A: 80.10930952982204,
  B: 67.22006831026425
};

const floatingPointColor2 = {
  L: 50.9588099835815,
  A: 77.47798295202801,
  B: 65.01211079141827
};


function round(n) {
  return Math.round(n * 10000) / 10000;
}

function format(c) {
  return {
    L: c[0],
    A: c[1],
    B: c[2],
  };
}

function assertDeltaE00(expected, c1, c2) {
  assert.equal(round(expected), round(DeltaE_Global.getDeltaE00(format(c1), format(c2))));
  assert.equal(round(expected), round(DeltaE_Global.getDeltaE00(format(c2), format(c1))));
}

describe('deltaE', () => {
  /**
   * CIE76 algorithm
   */
  describe('dE76', () => {
    /**
     * http://colormine.org/delta-e-calculator
     */
    it('Return DeltaE', (done) => {
      const resultGlobal = DeltaE_Global.getDeltaE76(color1, color2);
      const resultCommonJS = DeltaE_CommonJS.getDeltaE76(color1, color2);
      const correctDeltaE = 41.14608122288197;

      assert.equal(resultCommonJS, correctDeltaE);
      assert.equal(resultGlobal, correctDeltaE);
      done();
    });
  });

  /**
   * CIE94 algorithm
   */
  describe('dE94', () => {
    /**
     * http://colormine.org/delta-e-calculator/cie94
     */
    it('Return DeltaE', (done) => {
      const resultGlobal = DeltaE_Global.getDeltaE94(color1, color2);
      const resultCommonJS = DeltaE_CommonJS.getDeltaE94(color1, color2);
      const correctDeltaE = 22.849281934529994;

      assert.equal(resultCommonJS, correctDeltaE);
      assert.equal(resultGlobal, correctDeltaE);
      done();
    });

    it('Handles Floating Point Error', (done) => {
      const resultGlobal = DeltaE_Global.getDeltaE94(floatingPointColor1, floatingPointColor2);
      const resultCommonJS = DeltaE_CommonJS.getDeltaE94(floatingPointColor1, floatingPointColor2);
      const correctDeltaE = 2.3524048718867823;

      assert.equal(resultCommonJS, correctDeltaE);
      assert.equal(resultGlobal, correctDeltaE);
      done();
    })
  });

  /**
   * CIE2000 algorithm
   */
  describe('dE00', () => {
    /**
     * http://colormine.org/delta-e-calculator/cie2000
     */
    it('Return DeltaE', (done) => {
      const resultGlobal = DeltaE_Global.getDeltaE00(color1, color2);
      const resultCommonJS = DeltaE_CommonJS.getDeltaE00(color1, color2);
      const correctDeltaE = 22.3945069524179;

      assert.equal(resultCommonJS, correctDeltaE);
      assert.equal(resultGlobal, correctDeltaE);
      done();
    });

    /**
     * Cases taken from the paper "The CIEDE2000 Color-Difference Formula:
     * Implementation Notes, Supplementary Test Data, and Mathematical Observations"
     * by Gaurav Sharma, Wencheng Wu and Edul N. Dalal.
     */
    it('0.0 difference', () => {
      assertDeltaE00(0.0, [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]);
      assertDeltaE00(0.0, [99.5, 0.005, -0.010], [99.5, 0.005, -0.010]);
    });
    it('100.0 difference', () => {
      assertDeltaE00(100.0, [100, 0.005, -0.010], [0.0, 0.0, 0.0]);
    });
    it('True chroma difference (#1)', () => {
      assertDeltaE00(2.0425, [50.0000,
        2.6772, -79.7751,
      ], [50.0000,
        0.0000, -82.7485,
      ]);
    });
    it('True chroma difference (#2)', () => {
      assertDeltaE00(2.8615, [50.0000,
        3.1571, -77.2803,
      ], [50.0000,
        0.0000, -82.7485,
      ]);
    });
    it('True chroma difference (#3)', () => {
      assertDeltaE00(3.4412, [50.0000,
        2.8361, -74.0200,
      ], [50.0000,
        0.0000, -82.7485,
      ]);
    });
    it('True hue difference (#4)', () => {
      assertDeltaE00(1.0000, [50.0000, -1.3802, -84.2814], [50.0000,
        0.0000, -82.7485,
      ]);
    });
    it('True hue difference (#5)', () => {
      assertDeltaE00(1.0000, [50.0000, -1.1848, -84.8006], [50.0000,
        0.0000, -82.7485,
      ]);
    });
    it('True hue difference (#6)', () => {
      assertDeltaE00(1.0000, [50.0000, -0.9009, -85.5211], [50.0000,
        0.0000, -82.7485,
      ]);
    });
    it('Arctangent computation (#7)', () => {
      assertDeltaE00(2.3669, [50.0000,
        0.0000,
        0.0000,
      ], [50.0000, -1.0000,
        2.0000,
      ]);
    });
    it('Arctangent computation (#8)', () => {
      assertDeltaE00(2.3669, [50.0000, -1.0000,
        2.0000,
      ], [50.0000,
        0.0000,
        0.0000,
      ]);
    });
    it('Arctangent computation (#9)', () => {
      assertDeltaE00(7.1792, [50.0000,
        2.4900, -0.0010,
      ], [50.0000, -2.4900,
        0.0009,
      ]);
    });
    it('Arctangent computation (#10)', () => {
      assertDeltaE00(7.1792, [50.0000,
        2.4900, -0.0010,
      ], [50.0000, -2.4900,
        0.0010,
      ]);
    });
    it('Arctangent computation (#11)', () => {
      assertDeltaE00(7.2195, [50.0000,
        2.4900, -0.0010,
      ], [50.0000, -2.4900,
        0.0011,
      ]);
    });
    it('Arctangent computation (#12)', () => {
      assertDeltaE00(7.2195, [50.0000,
        2.4900, -0.0010,
      ], [50.0000, -2.4900,
        0.0012,
      ]);
    });
    it('Arctangent computation (#13)', () => {
      assertDeltaE00(4.8045, [50.0000, -0.0010,
        2.4900,
      ], [50.0000,
        0.0009, -2.4900,
      ]);
    });
    it('Arctangent computation (#14)', () => {
      assertDeltaE00(4.8045, [50.0000, -0.0010,
        2.4900,
      ], [50.0000,
        0.0010, -2.4900,
      ]);
    });
    it('Arctangent computation (#15)', () => {
      assertDeltaE00(4.7461, [50.0000, -0.0010,
        2.4900,
      ], [50.0000,
        0.0011, -2.4900,
      ]);
    });
    it('Arctangent computation (#16)', () => {
      assertDeltaE00(4.3065, [50.0000,
        2.5000,
        0.0000,
      ], [50.0000,
        0.0000, -2.5000,
      ]);
    });
    it('Large color differences (#17)', () => {
      assertDeltaE00(27.1492, [50.0000,
        2.5000,
        0.0000,
      ], [73.0000,
        25.0000, -18.0000,
      ]);
    });
    it('Large color differences (#18)', () => {
      assertDeltaE00(22.8977, [50.0000,
        2.5000,
        0.0000,
      ], [61.0000, -5.0000,
        29.0000,
      ]);
    });
    it('Large color differences (#19)', () => {
      assertDeltaE00(31.9030, [50.0000,
        2.5000,
        0.0000,
      ], [56.0000, -27.0000, -3.0000]);
    });
    it('Large color differences (#20)', () => {
      assertDeltaE00(19.4535, [50.0000,
        2.5000,
        0.0000,
      ], [58.0000,
        24.0000,
        15.0000,
      ]);
    });
    it('CIE technical report (#21)', () => {
      assertDeltaE00(1.0000, [50.0000,
        2.5000,
        0.0000,
      ], [50.0000,
        3.1736,
        0.5854,
      ]);
    });
    it('CIE technical report (#22)', () => {
      assertDeltaE00(1.0000, [50.0000,
        2.5000,
        0.0000,
      ], [50.0000,
        3.2972,
        0.0000,
      ]);
    });
    it('CIE technical report (#23)', () => {
      assertDeltaE00(1.0000, [50.0000,
        2.5000,
        0.0000,
      ], [50.0000,
        1.8634,
        0.5757,
      ]);
    });
    it('CIE technical report (#24)', () => {
      assertDeltaE00(1.0000, [50.0000,
        2.5000,
        0.0000,
      ], [50.0000,
        3.2592,
        0.3350,
      ]);
    });
    it('CIE technical report (#25)', () => {
      assertDeltaE00(1.2644, [60.2574, -34.0099,
        36.2677,
      ], [60.4626, -34.1751,
        39.4387,
      ]);
    });
    it('CIE technical report (#26)', () => {
      assertDeltaE00(1.2630, [63.0109, -31.0961, -5.8663], [62.8187, -29.7946, -4.0864]);
    });
    it('CIE technical report (#27)', () => {
      assertDeltaE00(1.8731, [61.2901,
        3.7196, -5.3901,
      ], [61.4292,
        2.2480, -4.9620,
      ]);
    });
    it('CIE technical report (#28)', () => {
      assertDeltaE00(1.8645, [35.0831, -44.1164,
        3.7933,
      ], [35.0232, -40.0716,
        1.5901,
      ]);
    });
    it('CIE technical report (#29)', () => {
      assertDeltaE00(2.0373, [22.7233,
        20.0904, -46.6940,
      ], [23.0331,
        14.9730, -42.5619,
      ]);
    });
    it('CIE technical report (#30)', () => {
      assertDeltaE00(1.4146, [36.4612,
        47.8580,
        18.3852,
      ], [36.2715,
        50.5065,
        21.2231,
      ]);
    });
    it('CIE technical report (#31)', () => {
      assertDeltaE00(1.4441, [90.8027, -2.0831,
        1.4410,
      ], [91.1528, -1.6435,
        0.0447,
      ]);
    });
    it('CIE technical report (#32)', () => {
      assertDeltaE00(1.5381, [90.9257, -0.5406, -0.9208], [88.6381, -0.8985, -0.7239]);
    });
    it('CIE technical report (#33)', () => {
      assertDeltaE00(0.6377, [6.7747, -0.2908, -2.4247], [5.8714, -0.0985, -2.2286]);
    });
    it('CIE technical report (#34)', () => {
      assertDeltaE00(0.9082, [2.0776,
        0.0795, -1.1350,
      ], [0.9033, -0.0636, -0.5514]);
    });
  });
});

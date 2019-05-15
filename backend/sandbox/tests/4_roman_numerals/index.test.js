const assert = require('assert');
const { romanNumerals } = require('../userinput.js');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('Arabic & roman number converter test', () => {
  it('0 should return error msg', () => {
    const result = 'Error';
    assert.equal(romanNumerals(0), result);
  });

  it('-1 should return error msg', () => {
    const result = 'Error';
    assert.equal(romanNumerals(-1), result);
  });

  it('>3000 should return error msg', () => {
    const result = 'Error';
    assert.equal(romanNumerals(3500), result);
  });

  it('non-numeral string arg should return error message', () => {
    const result = 'Error';
    assert.equal(romanNumerals('Hello'), result);
  });

  it('2471 should return MMDCCCLXIV', () => {
    const result = 'MMDCCCLXIV';
    assert.equal(romanNumerals(2864), result);
  });

  it('0 should return error msg', () => {
    const result = 'Error';
    assert.equal(romanNumerals(0), result);
  });

  it('-1 should return error msg', () => {
    const result = 'Error';
    assert.equal(romanNumerals(-1), result);
  });

  it('>3000 should return error msg', () => {
    const result = 'Error';
    assert.equal(romanNumerals(3500), result);
  });

  it('MMXIX should return 2019', () => {
    const result = 34;
    assert.equal(romanNumerals('XXXIV'), result);
  });
});

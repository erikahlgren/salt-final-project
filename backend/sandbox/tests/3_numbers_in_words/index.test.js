const assert = require('assert');
const { numbersToWords } = require('../userinput.js');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('Testing words in numbers', () => {
  it('0 should return "Error"', () => {
    const result = 'Error';
    assert.equal(numbersToWords(0), result);
  });

  it('-1 should return error msg', () => {
    const result = 'Error';
    assert.equal(numbersToWords(-1), result);
  });

  it('612713 should return "seven hundred and fourty five dollars"', () => {
    const result = 'six hundred twelve thousand seven hundred thirteen';
    assert.equal(numbersToWords(612713), result);
  });

  it('745 should return "seven hundred and fourty five dollars"', () => {
    const result = 'seven hundred fourty five';
    assert.equal(numbersToWords(745), result);
  });

  it('711 should return "seven hundred and fourty five dollars"', () => {
    const result = 'seven hundred eleven';
    assert.equal(numbersToWords(711), result);
  });

  it('007 should return "seven"', () => {
    const result = 'seven';
    assert.equal(numbersToWords(7), result);
  });

  it('21 should return "twenty one"', () => {
    const result = 'twenty one';
    assert.equal(numbersToWords(21), result);
  });

  it('19 should return "nineteen"', () => {
    const result = 'nineteen';
    assert.equal(numbersToWords(19), result);
  });

  it('9007199254740991 should return "nine quadrillion seven trillion one hundred ninety nine billion two hundred fifty four million seven hundred fourty thousand nine hundred ninety one"', () => {
    const result = 'nine quadrillion seven trillion one hundred ninety nine billion two hundred fifty four million seven hundred fourty thousand nine hundred ninety one';
    assert.equal(numbersToWords(9007199254740991), result);
  });

  it('1230567 should return "one million two hundred thirty thousand five hundred sixty seven"', () => {
    const result = 'one million two hundred thirty thousand five hundred sixty seven';
    assert.equal(numbersToWords(1230567), result);
  });

  it('1234567 should return "one million two hundred thirty four thousand five hundred sixty seven"', () => {
    const result = 'one million two hundred thirty four thousand five hundred sixty seven';
    assert.equal(numbersToWords(1234567), result);
  });

  it('non-numeral string arg should return error message', () => {
    const result = 'Error';
    assert.equal(numbersToWords('Hello'), result);
  });
});

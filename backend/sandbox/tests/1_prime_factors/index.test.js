const assert = require('assert');
const { primeFactors } = require('../userinput.js');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('This is the primefactor test', () => {
  it('Should return array of primenumbers', () => {
    const num = 20;
    const arr = [2, 2, 5];
    assert.deepEqual(primeFactors(num), arr);
  });

  it.skip('Should return array of primenumbers', () => {
    const num = 9007199254740991;
    const arr = [6361, 69431, 20394401];
    assert.deepEqual(primeFactors(num), arr);
  });

  it('check if number is bigger than zero', () => {
    const num = 0;
    assert.deepEqual(primeFactors(num), 'Nice try');
  });

  it('check for invalid input', () => {
    const num = 'number';
    assert.deepEqual(primeFactors(num), 'Nice try');
  });

  it('check if number is undefined', () => {
    const num = undefined;
    assert.deepEqual(primeFactors(num), 'Nice try');
  });

  it('check if number is NaN', () => {
    const num = NaN;
    assert.deepEqual(primeFactors(num), 'Nice try');
  });
});

const assert = require('assert');
const { fizzBuzz } = require('../userinput.js');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('FizzBuzz', () => {
  it('number divisable by three should return fizz', () => {
    const number = 3;
    assert.equal(fizzBuzz(number), 'Fizz');
  });
  it('number divisable by five should return fizz', () => {
    const number = 5;
    assert.equal(fizzBuzz(number), 'Buzz');
  });
  it('number divisable by three and five should return FizzBuzz', () => {
    const number = 15;
    assert.equal(fizzBuzz(number), 'FizzBuzz');
  });
  it('number not divisible by 3 or 5 should return number', () => {
    const number = 2;
    assert.equal(fizzBuzz(number), 2);
  });
  it('invalid parameter returns error message', () => {
    const number = 'foo';
    assert.equal(fizzBuzz(number), 'Nice try');
  });
});

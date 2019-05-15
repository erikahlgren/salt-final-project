const assert = require('assert');
const { modifyArray } = require('../userinput');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('Tests for array modification kata', () => {
  it('1 should be added to each element in array if length < 5', () => {
    const input = [1, 2, 3, 4];
    const result = [2, 3, 4, 5];
    assert.deepEqual(modifyArray(input), result);
  });

  it('2 should be added to each element in array if length > 5', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const result = [3, 4, 5, 6, 7, 8];
    assert.deepEqual(modifyArray(input), result);
  });
});

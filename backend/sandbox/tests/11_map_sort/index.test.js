const assert = require('assert');
const { highestNum } = require('../userinput');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('Combining array methods', () => {
  it('using map & sort, return the highest number in each nested array and sort the end result by highest numbers', () => {
    const array = [[400, 399], [300, 50], [210, 500], [600, 21]];
    const target = [600, 500, 400, 300];

    assert.deepEqual(highestNum(array), target);
  });
});

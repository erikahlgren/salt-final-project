const assert = require('assert');
const { reverseString } = require('../userinput');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('Combine array methods', () => {
  it('using map, reverse the given string in each element', () => {
    const array = ['Hello World', 'Joe Foo', 'Jane Bar', 'Aplha Bravo'];
    const target = ['dlroW olleH', 'ooF eoJ', 'raB enaJ', 'ovarB ahlpA'];
    assert.deepEqual(reverseString(array), target);
  });
});

const assert = require('assert');
const { capFirstLetter } = require('../userinput');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('Grasping array methods', () => {
  it('using map, capitalize every first letter in each string', () => {
    const array = ['salt', 'pepper', 'foo', 'bar', 'callbacks'];
    const target = ['Salt', 'Pepper', 'Foo', 'Bar', 'Callbacks'];
    assert.deepEqual(capFirstLetter(array), target);
  });
});

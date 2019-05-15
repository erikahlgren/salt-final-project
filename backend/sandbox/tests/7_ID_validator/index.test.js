const assert = require('assert');
const { isValid } = require('../userinput');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('The ID validator', () => {
  it('should accept a valid ID', () => {
    const token = '8f830a13-d059-41e1-a0e4-62a8fdfca8b4';
    assert(isValid(token));
  });

  it('should not accept tokens containing letters above h', () => {
    const token = '8f830j13-dq59-41ek-ape4-62a8fdrca8b4';
    assert(!isValid(token));
  });

  it('should not accept tokens that are too short', () => {
    const token = '8f830a13-41e1-a0e4-62a8fdfca8b4';
    assert(!isValid(token));
  });

  it('should not accept tokens that has extra characters at the beginning', () => {
    const token = 'x8f830a13-41e1-a0e4-62a8fdfca8b4';
    assert(!isValid(token));
  });

  it('should not accept tokens that has extra characters at the end', () => {
    const token = 'x8f830a13-41e1-a0e4-62a8fdfca8b4x';
    assert(!isValid(token));
  });

  it('should not accept tokens that are using wrong delimiters', () => {
    const token = '8f830a13_d059_41e1_a0e4_62a8fdfca8b4';
    assert(!isValid(token));
  });

  it('should not accept tokens containing spaces', () => {
    const token = '8f830j13 dq59 41ek ape4 62a8fdrca8b4';
    assert(!isValid(token));
  });

  it('should not accept tokens that not has the right form', () => {
    const token = '8f830a13-d059-41e1-a0e48-62afdfca8b4';
    assert(!isValid(token));
  });
});

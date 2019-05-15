const assert = require('assert');
const { isCheck } = require('../userinput');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('The check-checker', () => {
  it('should match check', () => {
    const check = 'check';
    assert(isCheck(check));
  });

  it('should match cheque', () => {
    const cheque = 'cheque';
    assert(isCheck(cheque));
  });

  it('should match sentence', () => {
    const american = 'I gave you the check!';
    assert(isCheck(american));

    const british = 'I gave you the cheque!';
    assert(isCheck(british));

    const american2 = 'You need to sign this check before using it.';
    assert(isCheck(american2));
  });

  it('should not match checking', () => {
    const checking = 'Just checking...';
    assert(!isCheck(checking));
  });

  it('should not match forecheck', () => {
    const forecheck = 'Peter Forsberg combines tenacious forecheck with strong defensive play.';
    assert(!isCheck(forecheck));
  });

  it('should be case insensitive', () => {
    const british = 'Cheque';
    assert(isCheck(british));
  });
});

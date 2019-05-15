const assert = require('assert');
const { filesNames } = require('../userinput');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('The Image File Filter', () => {
  const files = [
    'jenny76.png',
    'weekend party.jpg',
    'letter_to_daycare.docx',
    'my-favicon.ico',
    'logotype.svg',
  ];

  it('should return a single-element array, file name without extension', () => {
    assert.deepEqual(filesNames(['favicon.ico']), ['favicon']);
  });

  it('should use the last extension as extension', () => {
    assert.deepEqual(filesNames(['favicon.mov.zip']), ['favicon.mov']);
  });

  it('should return the file name as entered, if no extension was present', () => {
    assert.deepEqual(filesNames(['marcusbankid']), ['marcusbankid']);
  });

  it('should preserve spaces and white spaces', () => {
    assert.deepEqual(filesNames(['marcus bank id.pdf']), ['marcus bank id']);
  });

  it('should remove any path before the file name', () => {
    assert.deepEqual(filesNames(['/marcus/secrets/show noone/marcus bank id.pdf']), ['marcus bank id']);
  });

  it('should return a collection of file names without extensions', () => {
    assert.deepEqual(filesNames(files), ['jenny76', 'weekend party', 'letter_to_daycare', 'my-favicon', 'logotype']);
  });
});

const assert = require('assert');
const { fetchData } = require('../userinput');

const mod = require.resolve('../userinput.js');
delete require.cache[mod];

describe('Asynchronous Javascript', () => {
  it(`Write the fetchData function so that when called with a truthy value
  it returns a Promise that resolves the value "hello world"`, done => fetchData(true).then((data) => {
    assert.equal(data, 'hello world');
    done();
  }));

  it(`The fetchData function also should, if called with a falsy value,
  have the returned Promise reject with an error with the value "goodbye world"`, done => fetchData(false).then((data) => {
    assert.equal(data, 'goodbye world');
    done();
  }));
});

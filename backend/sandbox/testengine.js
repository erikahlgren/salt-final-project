const Mocha = require('mocha');
const reporter = require('./reporter');

module.exports = function testEngine(testPath, cb) {
  let passing = 0;
  let failing = 0;
  const resultPass = [];
  const resultFail = [];
  const mocha = new Mocha({
    reporter,
  });

  mocha.addFile(testPath);
  const runner = mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0;
  });

  runner.on('pass', (test) => {
    passing += 1;
    resultPass.push({
      fullTitle: test.fullTitle().replace(test.title, ''),
      description: test.title,
    });
  });

  runner.on('fail', (test, err) => {
    failing += 1;
    resultFail.push({
      fullTitle: test.fullTitle().replace(test.title, ''),
      description: test.title,
      message: err.name,
      actual: `${err.actual}`,
      expected: JSON.stringify(err.expected),
    });
  });

  return runner.on('end', () => {
    cb({
      failed: resultFail,
      failedCounter: failing,
      passed: resultPass,
      passedCounter: passing,
    });
  });
};

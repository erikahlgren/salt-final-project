const fs = require('fs');
const { NodeVM } = require('vm2');
const katasService = require('./dbhandler/kataservice');
const { addCompletedKata } = require('./dbhandler/userHandler');
const testEngine = require('./sandbox/testengine');

function idToTestPath(id) {
  return katasService.getOneKata(id);
}

// const sandboxInit = (id, cb) => {
//   const vm = new NodeVM({
//     require: {
//       external: true,
//     },
//   });

//   const code = fs.readFileSync('./sandbox/testengine.js');
//   const testPath = idToTestPath(id).tests;
//   const testRunner = vm.run(code, './sandbox/testengine.js');
//   testRunner(testPath, cb);
// };

const kataResultHandler = (obj, token, kataId, code) => {
  if (obj.failedCounter + obj.passedCounter === obj.passedCounter) {
    addCompletedKata(obj, token, kataId, code);
  }
};

const katasHandler = (req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  fs.writeFileSync('./sandbox/tests/userinput.js', req.body += `\n\n${katasService.getOneKata(id).export}`);
  
  const mod = require.resolve(idToTestPath(id).tests);
  delete require.cache[mod];
  
  // sandboxInit(id, (obj) => {
  //   kataResultHandler(obj, token, id, req.body);
  //   res.send(obj);
  // });

  testEngine(idToTestPath(id).tests, (obj) => {
    kataResultHandler(obj, token, id, req.body);
    res.send(obj);
  });
};

module.exports.katasHandler = katasHandler;
module.exports.idToTestPath = idToTestPath;

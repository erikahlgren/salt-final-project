const fetch = require('node-fetch');
const fs = require('fs');
const util = require('util');
const idToTestPath = require('../katasHandler');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const readUserDatabase = async () => {
  const dbUsers = await readFile('./dbhandler/user.json');
  return dbUsers.toString();
};

const addCompletedKata = async (obj, token, kataId, code) => {
  let updatedUserScore = await readUserDatabase();
  updatedUserScore = JSON.parse(updatedUserScore);

  if (updatedUserScore.find(el => el.token == token)) {
    const kataObj = idToTestPath.idToTestPath(kataId);

    const currentUser = updatedUserScore.find(el => el.token == token);
    if (currentUser.finishedKatas.kata.filter(el => el.id == kataId).length === 0) {
      updatedUserScore = updatedUserScore.map((el) => {
        if (el.token == token) {
          return {
            name: el.name,
            id: el.id,
            token,
            finishedKatas: {
              kata: [...el.finishedKatas.kata, kataObj],
              solution: code,
            },
            score: el.score + idToTestPath.idToTestPath(kataId).score,
          };
        }
      });
      await writeFile('./dbhandler/user.json', JSON.stringify(updatedUserScore), 'utf8', (err) => {
        if (err) throw err;
      });
    }
  }
};

const writeToFileTemp = async (obj, token) => {
  let allUsers = [];
  const existingUsers = await readUserDatabase();

  if (existingUsers) {
    allUsers = [...existingUsers].join('');
    allUsers = JSON.parse(allUsers);
    // update token for existing users
    allUsers = allUsers.map((el) => {
      const newToken = el.id === obj.id ? token : el.token;
      return ({
        name: el.name,
        id: el.id,
        token: newToken,
        finishedKatas: el.finishedKatas,
        score: el.score,
      });
    });
    // add non-existing users to user array
    if (!allUsers.find(el => el.name == obj.login)) {
      const userObj = {
        name: obj.login,
        id: obj.id,
        token,
        finishedKatas: {
          kata: [],
          solution: null,
        },
        score: 0,
      };
      allUsers.push(userObj);
    }
  } else {
    const userObj = {
      name: obj.login,
      id: obj.id,
      token,
      finishedKatas: {
        kata: [],
        solution: null,
      },
      score: 0,
    };
    allUsers.push(userObj);
  }
  writeFile('./dbhandler/user.json', JSON.stringify(allUsers), 'utf8', (err) => {
    if (err) throw err;
  });
};

const userHandler = async (req, res) => {
  const userData = await fetch(`https://api.github.com/user?access_token=${req.params.id}`);
  const r = await userData.json();
  await writeToFileTemp(r, req.params.id);
  res.end();
};

const getUser = async (id) => {
  const p = await readUserDatabase();
  return p.find(el => el.id == id);
};

const getUserStats = async (req, res) => {
  readUserDatabase()
    .then(users => JSON.parse(users))
    .then(users => users.find(el => el.token == req.params.id))
    .then(user => res.send(JSON.stringify(user)));
};

module.exports = {
  userHandler,
  getUser,
  getUserStats,
  addCompletedKata,
};

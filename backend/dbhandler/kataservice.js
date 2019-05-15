const storage = require('./katas.json');

function getKatas() {
  return storage.katas.map(el => ({
    id: el.id,
    name: el.name,
  }));
}

function getOneKata(id) {
  // eslint-disable-next-line eqeqeq
  return storage.katas.find(el => el.id == id);
}

module.exports.getKatas = getKatas;
module.exports.getOneKata = getOneKata;

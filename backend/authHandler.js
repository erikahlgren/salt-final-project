const request = require('superagent');

require('dotenv').config();

const authHandler = async (req, res) => {
  const { code } = req.query;
  request
    .post('https://github.com/login/oauth/access_token')
    .set('Accept', 'application/json')
    .send({
      client_id: '5f62ee7d666cb05485e7',
      client_secret: process.env.GITOAUTH,
      code,
    })
    .then(async (result) => {
      const data = result.body;
      const id = data.access_token;
      res.cookie('id', id);
      res.redirect('https://localhost:3000/');
    });
};

module.exports.authHandler = authHandler;

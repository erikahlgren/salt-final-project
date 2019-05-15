const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const katasService = require('./dbhandler/kataservice');
const { katasHandler } = require('./katasHandler');
const { authHandler } = require('./authHandler');
const { userHandler, getUserStats } = require('./dbhandler/userHandler');

const app = express();
const loginLink = 'https://github.com/login/oauth/authorize?client_id=5f62ee7d666cb05485e7&redirect_uri=https://localhost:8443/validate&allow_signup=false';

app.use(cors());
app.use(parser.json());
app.use(cookieParser());
app.use(parser.text({
  type: 'text/plain',
}));

app.use(parser.text({
  type: 'html/text',
}));

app.get('/login', (req, res) => {
  res.redirect(loginLink);
});

app.get('/validate', authHandler);

app.get('/katas/:id', (req, res) => {
  res.send(JSON.stringify(katasService.getOneKata(req.params.id)));
});

app.get('/katas', (req, res) => {
  res.send(JSON.stringify(katasService.getKatas()));
});

app.post('/:id?', katasHandler);

app.get('/users/:id', getUserStats);

app.get('/signup/:id', userHandler);

module.exports.app = app;

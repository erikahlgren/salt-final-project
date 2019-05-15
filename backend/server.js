const fs = require('fs');
const https = require('https');
const { app } = require('./app');

const privateKey = fs.readFileSync('./certificates/server.key', 'utf8');
const certificate = fs.readFileSync('./certificates/server.crt', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);

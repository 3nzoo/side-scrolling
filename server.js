const express = require('express');
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
var server = http.Server(app);

app.set('port', PORT);
app.use('/', express.static(__dirname + '/'));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, function () {
  console.log(`Starting server on port ${PORT}`);
});

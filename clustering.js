process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// Is the file being executd in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed againg but in child mode
  cluster.fork();
  cluster.fork();
} else {
  // Im a child, Im goint to act like a server
  const express = require('express');
  const crypto = require('crypto');
  const app = express();

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('This  was fast1');
  });

  app.listen(3000);
}

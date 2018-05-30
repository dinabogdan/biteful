const express = require('express');
const database = require('./controllers/DatabaseController.js');

const app = express();

app.get('*', (req, res) => {
  res.send('Hello from the other side!');
});

app.listen(9090, () => console.log('I am listening on port 9090'));

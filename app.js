const express = require('express');
const app = express();

app.get('/', (req, res)=> {
  res.send('hello anton');
})

app.listen(3002);

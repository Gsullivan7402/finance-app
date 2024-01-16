const express = require('express');
const app = express();

app.get('/quotes', (req, res) => {
  res.sendFile(__dirname + '/quotes.json');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

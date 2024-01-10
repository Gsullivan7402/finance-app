const express = require('express');
const app = express();

app.get('/quotes', (req, res) => {
  // Replace 'quotes.json' with the actual path to your JSON file
  res.sendFile(__dirname + '/quotes.json');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

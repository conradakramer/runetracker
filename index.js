const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));


app.listen(port, function() {
  console.log('Node app is running on port', port);
});



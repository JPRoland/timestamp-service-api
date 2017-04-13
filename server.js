// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  const date_string = req.params.date_string;

  if (!date_string) {
    return res.json({unix: Date.now(), utc: new Date().toUTCString()});
  }

  const date = isNaN(date_string) ? new Date(date_string) : new Date(+date_string);

  if(!(date.getTime() > 0)) {
    return res.json({unix: null, utc: "Invalid Date"});
  }

  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// listen for requests :)
const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

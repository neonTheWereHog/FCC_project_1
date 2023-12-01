// where your node app starts
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", (req, res) => {
  let { date } = req.params;
  !isNaN(Number(date)) ? date = Number(date) : date
  /*If date does not contain any hyphens, then it is converted from 'string'
   to 'number'. Otherwise we just return the date.*/ 
  let tester = new Date(date)
  let UNIX = new Date(date).valueOf();

  if (tester == "Invalid Date") {
      return res.json({error: "Invalid Date"})
  }
  date = new Date(date);
  date = date.toUTCString()

  res.json({unix: UNIX, utc: date})
})

app.get("/api", (req, res) => {
  res.json({unix: Date.now(), utc: new Date()})
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

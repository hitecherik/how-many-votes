// imports
const express          = require('express'),
      constituency     = require('./lib/constituency'),
      { Constituency } = require('./lib/database');

// config
const port = 3000,
      validPostcodes =
        /^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/,
      validLatitudes = /^[56]\d(\.\d+)?$/,
      validLongitudes = /^-?[012](\.\d+)?$/;

// create server
const app  = express();

// serve static files
app.use(express.static('static'));

// get information for a postcode
app.get('/api/:postcode', (req, res) => {
  let { postcode } = req.params;

  postcode = postcode.toUpperCase();

  if (!validPostcodes.test(postcode)) {
    res.sendStatus(400);
    return;
  }

  constituency.byPostcode(postcode)
    .then(code => res.send((new Constituency(code)).json))
    .catch(error => {
      console.log(`[ERROR] ${error}`);
      res.sendStatus(500);
    });
});

// get information for a set of coordinates
app.get('/api/:latitude/:longitude/', (req, res) => {
  const { latitude, longitude } = req.params;

  if (!validLatitudes.test(latitude) || !validLongitudes.test(longitude)) {
    res.sendStatus(400);
    return;
  }

  constituency.byCoordinates(latitude, longitude)
    .then(code => res.send((new Constituency(code)).json))
    .catch(error => {
      console.error(`[ERROR] ${error}`);
      res.sendStatus(500);
    });
});

// listen for requests
app.listen(port, () => console.log(`how-many-votes listening on port ${port}!`));

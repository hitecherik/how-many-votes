// imports
const https = require('https');

// config
const baseURI = 'https://api.postcodes.io/postcodes/';

// store a constituency code for a postcode
class Postcode {
  constructor(result) {
    this.code = result.codes.parliamentary_constituency;
    this.postcode = result.postcode;
  }
}

// return a Promise for constituency data
function makeRequest(uri) {
  return new Promise((resolve, reject) => {
      https.get(baseURI + uri, res => {
        if (res.statusCode != 200) {
          reject(`Non-200 status code: ${res.statusCode}`);
          return;
        }

        let raw = "";
        res.on("data", chunk => raw += chunk);

        res.on("end", () => resolve(JSON.parse(raw)));
      }).on("error", err => reject(err));
  });
}

// creates a Promise for a constituency code given a postcode
function byPostcode(postcode) {
  return makeRequest(postcode).then(data => new Postcode(data.result));
}

// creates a Promise for a constituency code given a latitude and longitude
function byCoordinates(latitude, longitude) {
  return makeRequest(`?latitude=${latitude}&longitude=${longitude}`).then(data => {
    if (data.result.length == 0) {
      throw "No results found";
    }

    return new Postcode(data.result[0]);
  });
}

module.exports = { byPostcode, byCoordinates };

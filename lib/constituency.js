// imports
const request = require('request-promise-native');

// config
const baseURI = 'https://api.postcodes.io/postcodes/';

// return a Promise for constituency data
function makeRequest(uri) {
  return request({
    uri: baseURI + uri,
    json: true,
    transform: data => {
      if (data.status != 200) {
        throw data.error;
      }

      return data;
    }
  });
}

// creates a Promise for a constituency code given a postcode
function byPostcode(postcode) {
  return makeRequest(postcode).then(data => data.result.codes.parliamentary_constituency);
}

// creates a Promise for a constituency code given a latitude and longitude
function byCoordinates(latitude, longitude) {
  return makeRequest(`?latitude=${latitude}&longitude=${longitude}`).then(data => {
    if (data.result.length == 0) {
      throw "No results found";
    }

    return data.result[0].codes.parliamentary_constituency;
  });
}

module.exports = { byPostcode, byCoordinates };

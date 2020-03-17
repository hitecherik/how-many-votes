// imports
const sqlite3 = require('better-sqlite3');

// config
const dbPath = 'constituencies.db';

// database
const db = sqlite3(dbPath, {
  readonly: true,
  fileMustExist: true
});

// SQL statement for looking up a constituency
const constituencyLookup = db.prepare('SELECT name, county, country, votes2019 as votes FROM constituencies WHERE id=?');

// a class for representing a database entry
class Constituency {
  constructor(postcodeConstituency) {
    const row = constituencyLookup.get(postcodeConstituency.code);

    this.postcodeConstituency = postcodeConstituency;
    this.name = row.name;
    this.county = row.county;
    this.country = row.country;
    this.votes = row.votes;
  }

  get location() {
    if (this.county === this.country) {
      return this.county;
    }

    return `${this.county}, ${this.country}`;
  }

  get json() {
    return {
      name: this.name,
      postcode: this.postcodeConstituency.postcode,
      location: this.location,
      votes: this.votes
    }
  }
}

module.exports = { Constituency };

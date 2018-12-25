# How Many Votes?

Tells you how many votes you have based on your (or another) UK constituency. Try it out [here](https://howmanyvotes.alexnielsen.me).

Uses turnout and electorate figures from the 2017 General Election ([data](https://researchbriefings.parliament.uk/ResearchBriefing/Summary/CBP-7979)).

## Installation

Before running for the first time, the SQLite3 database should be created and populated. The easiest way to do this is using SQLite3 batch mode:

```sh
$ sqlite3 -batch constituencies.db < constituencies.sql
```

If you decide to name the database something other than `constituencies.db` or locate it somewhere other than the project's root directory, make sure to [update its path](lib/database.js) in `lib/database.js`.

Next, install all of the node dependencies:

```sh
$ npm install
```

Finally, run the server:

```sh
$ node index.js
```

## Methodolgy

1. I took the _detailed results by constituency_ dataset from the House of Commons Library's [full results and analysis](https://researchbriefings.parliament.uk/ResearchBriefing/Summary/CBP-7979) of the 2017 UK General Election.
2. I took the average turnout accross all 650 constituencies, and worked out, from that, the average percentage of the vote that a voter in the average constituency had.
3. I compared this figure to the actual percentage of the vote that a voter in each constituency had to see how far away the values were from each other.

## Licence

Copyright (c) Alexander Nielsen, 2018. [Licenced under MIT licence.](LICENCE.md)

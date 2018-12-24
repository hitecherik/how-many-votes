# How Many Votes?

Tells you how many votes you have based on your (or another) UK constituency.

Uses turnout and electorate figures from the 2017 General Election ([data](https://researchbriefings.parliament.uk/ResearchBriefing/Summary/CBP-7979)).

## Installation

Before running for the first time, the SQLite3 database should be created and populated. The easiest way to do this is using SQLite3 batch mode:

```bash
$ sqlite3 -batch constituencies.db < constituencies.sql
```

Next, install all of the node dependencies:

```bash
$ npm i
```

Finally, run the server:

```bash
node index.js
```

## Licence

Copyright (c) Alexander Nielsen, 2018. [Licenced under MIT licence.](LICENCE.md)


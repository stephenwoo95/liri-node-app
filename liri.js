//Grab keys for APIs
var twitterKeys = require("./keys.js").twitterKeys;
console.log(twitterKeys);
var spotifyKeys = require("./keys.js").spotifyKeys;
console.log(spotifyKeys);
var omdbKey = require("./keys.js").omdbKey;
console.log(omdbKey);
var fs = require("fs");

//Grab command line command
var command = process.argv.slice(2);
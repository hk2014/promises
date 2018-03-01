/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Unable get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

// promisify takes a function whose last argument is a callback, and it returns a promise that resolves when that callback is called successfully and rejects if the callback is called with an error.

// http://bluebirdjs.com/docs/api/promise.promisify.html
var getGitHubProfileAsync = Promise.promisify(getGitHubProfile);


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

//http://bluebirdjs.com/docs/api/promise.promisify.html
var generateRandomTokenAsync = Promise.promisify(generateRandomToken);


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' funny sam lol';
      })
      .join('\n');

    callback(err, funnyFile);
  });
};

// http://bluebirdjs.com/docs/api/promise.promisify.html
var readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny);

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
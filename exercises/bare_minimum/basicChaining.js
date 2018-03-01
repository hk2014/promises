/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var GitHub = require('./promisification.js').getGitHubProfileAsync;

// The promisifyAll() method promisifies the entire module or object which is being called as a parameter. What it means is that a copy of each property of the object is created with Async suffix, which is actually a promisified version of the same method, i.e you can use the .then() or .done() methods on it .

// For example, if you have a doSomething() method in someModule module, after calling Promise.promisifyAll(someModule) a new method will be created in the module called doSomethingAsync(). You can use it this way:

// http://bluebirdjs.com/docs/api/promise.promisifyall.html
Promise.promisifyAll(fs);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // return the contents of the path.
  return fs.readFileAsync(readFilePath)
    .then(data =>
      // get the first line of the file/data
      data.toString().split('\n')[0]
    )
    .then(user =>
      // pass in the user to getGitHubProfileAsync
      GitHub(user)
    )
    .then(profile => {
      // stringify the received object profile data
      profile = (JSON.stringify(profile));
      // writes the JSON response of the API
      return fs.writeFileAsync(writeFilePath, profile);
    });
};


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */


var Promise = require('bluebird');
var helper = require('../bare_minimum/promiseConstructor');
var fs = require('fs');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  var result = filePaths.map((data) => {
     // retrieve the first line for each of the file at `filePath`
    return helper.pluckFirstLineFromFileAsync(data);
  });
  // iterate over all the values in the Iterable into an array and return a promise that is fulfilled when all the items in the array are fulfilled
  var pr = Promise.all(result)
  .then((value) => { return (value.join('\n')); } )
  .then((stringToWrite) => {
    fs.writeFile(writePath, stringToWrite);
  });

  return pr;
};


// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};
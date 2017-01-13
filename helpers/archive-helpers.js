var fs = require('fs');
var path = require('path');
var _ = require('underscore');
//var htmlFetch = require('htmlFetcher')
var http = require('http');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
 // console.log("Callback for readListOfUrls: ", callback);
  fs.readFile(exports.paths.list, function (err, data) {
    if (err) {
      callback(err);
      return;
    } else {
      var ourUrls = data.toString().split('\n');
      callback(ourUrls);
    }
  });
};


exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, function (err, data) {
    if (err) {
      callback(err);
      return;
    } else {
      var ourUrls = data.toString().split('\n');
      var bool = (ourUrls.indexOf(url) !== -1);
      callback(bool);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + "\n", function(err, data){
    if(err){
      console.log("Error: " + err);
    } else {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  var sitePath = path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(urls) {
  // Iterate over urls and pipe to new files
  _.each(urls, function (url) {
    if (!url) { return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};


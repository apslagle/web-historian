// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
//this is my guess for how to start this


var archive = require('../helpers/archive-helpers');
archive.readListOfUrls(archive.downloadUrls);

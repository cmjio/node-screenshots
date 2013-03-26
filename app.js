#!/usr/bin/env node

var Screenshot = require('./lib/screenshots');
var screenshots = new Screenshot();


// Modify this section with your S3 Account details
screenshots.configure({ 
	accessKeyId: 'YOUR_AWS_S3_ACCESSKEY', 
	secretAccessKey: 'YOUR_AWS_S3_SECRETACCESSKEY',
	bucket:'YOUR_AWS_S3_BUCKET_NAME'
});
// End modifications

screenshots.takeScreenshot();
var util = require('util'),
	request = require('request'),
	fs = require('fs'),
	http = require('http'),
	childProcess = require('child_process'),
	spawn = childProcess.spawn,
	AWS = require('aws-sdk'),
	growl = require('growl'),
	clc = require('cli-color');

function Screenshot(){
	
	this.Settings = {};
	this.API = 'http://pngio.com/api/screenshots';

}

Screenshot.prototype.configure = function(obj) {
	var _ = this;
	for(key in obj){
		_.Settings[key] = obj[key];
	}
};

Screenshot.prototype.takeScreenshot = function() {
	var _ = this;
	console.log(clc.green('Take your screenshot...'));
	childProcess.exec(("screencapture -i ./lib/screenshot.png"), function(){
		_.uploadScreenshotToS3();
	});
};

Screenshot.prototype.uploadScreenshotToS3 = function() {
	var _ = this;
	fs.readFile(__dirname+'/screenshot.png', function(err,data){

		if(!err){
			var timestamp = new Date().getTime();
			var generatedFileName = 'screenshot-'+timestamp+'.png';


			console.log(clc.green('Uploading to S3 bucket...'));
			growl('Uploading screenshot...');

			AWS.config.update({ accessKeyId: _.Settings.accessKeyId, secretAccessKey: _.Settings.secretAccessKey });

			var s3 = new AWS.S3();
		    s3.client.putObject({
		        Bucket: _.Settings.bucket,
		        Key: generatedFileName,
		        Body: data,
		        ACL: 'public-read'
		    }, function(err,data){
		    	if(err) console.log(err.message);
		    	if(!err){
		    		console.log(clc.green('Upload complete!'));
		    		var fullImagePath = 'https://s3.amazonaws.com/'+_.Settings.bucket+'/'+generatedFileName;
		    		_.shortenS3Url(fullImagePath);
		    	}
		    });
		} else{
			console.log(clc.red(err));
		}
	});
};

Screenshot.prototype.shortenS3Url = function(path) {
	var _ = this;
	console.log(clc.yellow('Starting the post to api process...'));
	request({
		headers: {'content-type' : 'application/x-www-form-urlencoded'}, 
		uri:_.API, 
		body:'url='+path+'&type=image',
		method: 'POST'
	}, function(error, response, body){
		console.log(clc.yellow('Posted to api'));
		var response = JSON.parse(body);
		var shortenedUrl = 'http://pngio.com/i/'+response.slug;
		_.writeToClipboard(shortenedUrl);
	});
};

Screenshot.prototype.writeToClipboard = function(url) {
	var _ = this;
	childProcess.exec(("echo '"+url+"' | pbcopy"), function(err, data){
		if(!err){
			growl('Your image has been uploaded and the url is in your clipboard');
		}
	});
};

module.exports = Screenshot;
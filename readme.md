Node Screenshots
==========================


Install Steps for OSX.  Node.js and AWS account required with S3 enabled.

#### Step 1
Clone in to your home directory. From terminal do the following:
	
	cd ~
	git clone git@github.com:edgeui/node-screenshots.git 

Open up the folder in your text editor and look in `app.js` you will need to add your Amazon S3 API key details from your AWS account and your bucket where you wish your screenshots to be uploaded too.  Save the file.

#### Step 2
Open up Automator and create a new `Service`.  Look for `Run Shell Script` in the actions window.  Click and drag to the area indicated on the right.  In the top portion of that window make sure to choose `no input` against Service receives. In the shell section add the following commands.

    cd node-screenshots
    ./app.js

Save As : `nodescreenshots`

#### Step 3
Open Keyboard settings from system settings; Click the `Keyboard Shortcuts` tab.  Within `Services > General` look for `nodescreenshots`.  Enable and add your desired keyboard shortcut.  Close the settings window and have fun.

### Help

If you have any further questions please contact me or use the [issues page](https://github.com/edgeui/node-screenshots/issues) on the project page at Github.com.
//all the import of libariris
const toFile = require('data-uri-to-file');
let WebCamera = require("webcamjs");
let FormData = require('form-data');
let electron = require('electron');
var request = require('request');
let axios = require('axios');
const path = require('path'); // Load the dialogs component of the OS
let fs = require('fs');
const { resolve } = require('path');


//creating the live streeming of the camera to the 
WebCamera.set({
	height: 500,
	width: 700,
	flip_horiz: true // notice this flips the red box too
});
WebCamera.attach('#camera');
console.log("The camera has been started");
document.getElementById("camera").children[1].classList.add("Camera");

WebCamera.on("live", () => {
	let cropper = document.createElement("div");
	cropper.classList.add("CropBox");
	document.getElementById("camera").appendChild(cropper);
});

WebCamera.set({
	height: 500,
	width: 700,
	crop_width: 400,
	crop_height: 400
});
//WebCamera.attach('#crop')
//the procecs of saving the img to the computer
function processBase64Image(dataString) {
	let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};

	if (matches.length !== 3) {
		return new Error('Invalid input string');
	}

	response.type = matches[1];
	response.data = new Buffer(matches[2], 'base64');

	return response;
}

//creating the listener that sees if some one clicked on the take button
document.getElementById("take").addEventListener('click', function () {
	WebCamera.snap(function (data_uri) {
		// Save the image in a variable
		let imageBuffer = processBase64Image(data_uri);
		// Start the save dialog to give a name to the file
		fs.writeFile(path.join(__dirname, 'image.png'), imageBuffer.data, function (err) {
			if (err) {
				console.log("Cannot save the file :'( time to cry !");
			} else {
				alert("Image saved succesfully");

				var req = request.post('http://192.168.1.110:6741/img', function callBack(err, resp, body) {
					if (err) {
						console.log('Error!');
					}
					else{
						document.getElementById('predict').textContent += body
					}
				});
				var form = req.form();
				form.append('image', fs.createReadStream(path.join(__dirname, 'image.png')), {
					filename: "image.png",
					contentType: 'image/png'
				});
				

			}
		});
		
	});

}, false);
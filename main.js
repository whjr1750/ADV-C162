prediction_1 ="";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
function preload() {
    console.log("preload executed")
    
}
function setup(){  // Added the classifier in setup to resolve issue
    console.log("setup executed")
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CGZOprZHY/model.json' , modelLoaded);
}
camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);



function modelLoaded() {
    console.log("Model Loaded!");
}

function check() {
    captured_image = document.getElementById("captured_image");
    classifier.classify(captured_image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById("result").innerHTML = results[0].label;
    prediction_1= results[0].label;
    if (prediction_1 == 'With Mask') {
        document.getElementById("update_emoji").innerHTML = "&#x1F637;";
        document.getElementById("status").innerHTML = "Entry Permitted!";
    } else if (prediction_1 == 'Without Mask') {
        document.getElementById("update_emoji").innerHTML = "&#x26d4;";
        document.getElementById("status").innerHTML = "Entry Denied!";
    } else {
        document.getElementById("update_emoji").innerHTML = "&#x26d4;";
        document.getElementById("status").innerHTML = "Entry Denied!";
    }
}
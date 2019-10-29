// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO and p5.js
=== */

let video;
let yolo;
let status;
let objects = [];

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the original video
  video.hide();
  status = select('#status');
}

function draw() {
  var numberOfPeople = 0
  image(video, 0, 0, width, height);
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].label == "person") {
      numberOfPeople += 1;
      background (255);
      fill(0);
      noStroke();
      text("STOP LOOKING AT ME", width/2, height/2);
   } else {
      noStroke();
      fill(0, 255, 0);
      text(objects[i].label, objects[i].x * width, objects[i].y * height - 5);
      noFill();
      strokeWeight(4);
      stroke(0, 255, 0);
      rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
  }
}

if (numberOfPeople >= 2) {
  textAlign(CENTER, TOP);
  fill(255, 0, 0);
  textSize(12 * numberOfPeople);
  text("Party Time !", width/2, 0);
}
}
  
function startDetecting() {
  status.html('Model loaded!');
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}

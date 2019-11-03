// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

var leftY;
var rightY;
var playerWidth = 10;
var playerHeight = 80;
var framesLeft= [];
var framesRight= [];
var frames = 3;


// The ball, or puck
var puck = {
  x: 300,
  y: 200,
  vx: 2,
  vy: 1,
  size: 20,
}

function setup() {
  createCanvas(640, 470);
  video = createCapture(VIDEO);
  video.size(width, height);
  
  leftY = height/2;
  rightY = height/2;
  
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  noStroke();
  image(video, 0, 0, width, height);
  
  // Draw the players
  rectMode(CORNER);
  rect(0, leftY, playerWidth, playerHeight);
  rect(width - playerWidth - 1, rightY, playerWidth, playerHeight);
  
  // Draw the puck
  fill(255);
  rectMode(CENTER);
  rect(puck.x, puck.y, puck.size, puck.size);
  
  // Update the puck position
  puck.x += puck.vx;
  puck.y += puck.vy;
  
  // Check if puck is off the top or bottom screen
  if (puck.y < 10 || puck.y > height-10) {
    puck.vy *= -1;
  }
  
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  // drawSkeleton();
  
  // Check if a player scored
  if (puck.x > width) {
    noStroke();
    fill(255);
    textAlign(CENTER);
    text("Left player scores a point!", width/2, 50);
    loop();
  }
  if (puck.x < 0) {
    noStroke();
    fill(255);
    textAlign(CENTER);
    text("Right player scores a point!", width/2, 50);
    loop();
  }
  
  // Check if puck is hitting a paddle
  if (puck.x < playerWidth && puck.y > leftY && puck.y < leftY + playerHeight) {
    puck.vx *= -1;
  }
  if (puck.x > width - playerWidth && puck.y > rightY && puck.y < rightY + playerHeight) {
    puck.vx *= -1;
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.4) {
        // fill(255, 0, 0);
        // noStroke();
        // ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        if (keypoint.part == 'rightWrist' ||
           keypoint.part == 'leftWrist'){
          fill(255);
          ellipse(keypoint.position.x, keypoint.position.y, 10,10);
        }
        if (keypoint.part == 'leftWrist' &&
           keypoint.position.x < width/2){
          framesLeft.push(keypoint.position.y);  
          var averageLeftY = 0;
          for (let i = framesLeft.length-frames; i < framesLeft.length; i++){
          averageLeftY += framesLeft[i];
          }
          leftY = averageLeftY / frames;
        }
        if (keypoint.part == 'rightWrist' &&
           keypoint.position.x > width/2){
          framesRight.push(keypoint.position.y);
          var averageRightY = 0;
          for (let i = framesRight.length-frames; i < framesRight.length; i++){
          averageRightY += framesRight[i];
          }
          rightY = averageRightY / frames;
        }
      }
      
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

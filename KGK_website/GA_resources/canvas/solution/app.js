// variables to store canvas and context
var canvas, context;

// variable to keep track of time
var start = null;

// variable to model ball's position and size
var ball = {
  x: 300,
  y: 300,
  vx: 400,
  vy: 0,
  radius: 20
};
var GRAVITY = 1000;

// function to draw ball onto canvas
var drawBall = function() {
  context.clearRect(0, 0, 800, 600);
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  context.fill();
}

// function to move ball a little bit and draw it
var updateBall = function(time) {
  // Find out how much time has passed since last animation frame
  if (!start) { start = time }
  var dt = time - start; // dt is a symbol to represent how much time has passed
  start = time;

  // Change velocity based on gravity
  ball.vy += GRAVITY * dt / 1000;

  // Move the ball according to its velocity
  ball.x += ball.vx * dt / 1000;
  ball.y += ball.vy * dt / 1000;

  // Bounce off the walls
  if (ball.x > 800 - ball.radius) { ball.vx *= -1; }
  if (ball.x < ball.radius)       { ball.vx *= -1; }
  if (ball.y > 600 - ball.radius) { ball.vy *= -1; }
  if (ball.y < ball.radius)       { ball.vy *= -1; }

  // Draw the ball's new location
  drawBall();

  // Schedule the next `updateBall` call
  requestAnimationFrame(updateBall);
}

window.onload = function() {
  canvas = document.getElementById('the-canvas');
  context = canvas.getContext('2d');
  requestAnimationFrame(updateBall);
}

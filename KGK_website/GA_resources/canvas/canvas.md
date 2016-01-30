# Canvas Animation

**PRO-TIP: If you are on a Mac, use Safari for this exercise, as it is
much better at rendering animation than Chrome**

### Learning Objectives

* Perform basic drawing operations on an HTML5 canvas
* Use `requestAnimationFrame` to perform animations

### What's the Canvas?

HTML5 introduced several new tags into the HyperText Markup Language. Some of
these tags provided semantic ways to express one's HTML, such as `section` and
`article`. Some other tags introduced great new functionality into web pages,
straight through HTML! Examples of this are `audio`, `video`, and our favorite
for the day, `canvas`.

The HTML5 canvas is an HTML tag that exposes a versatile JavaScript interface
that you, the developer, can take advantage of to render graphs to a web page.
In other words, it lets you draw things.

### Drawing on a Canvas with a Context

Open up that starter code. There is a single canvas tag in the body of this page
with the id `the-canvas`. This canvas tag also has some additional attributes,
namely width and height. This width and height does not represent how big the
canvas appears on the page. They represent how many "canvas pixels" wide and
tall our canvas is. Our canvas is currently 800 canvas pixels wide, and 600
canvas pixels tall.

Open up your console. First, let's grab the canvas element through conventional
DOM methods.

```js
var canvas = document.getElementById('the-canvas');
```

Note that this is a plain DOM element, not a jQuery element.

In order to draw things on this canvas, we must fetch a property of this canvas
called its context. You can imagine the context as the artist in charge of the
canvas, to whom you can give directions to draw things.

```js
var context = canvas.getContext('2d');
```

The general philosophy behind using the context to draw is the following. First
we specify a path. Then we specify a "brush" to color in the path. Let's first
specify a path. Rectangles sound okay? Okay.

```js
context.beginPath(); // Specify that we're starting a path
context.rect(10, 20, 30, 40);
```

The first two argument specify the x and y coordinates (from the top left) of
the top-left corner of our rectangle. The third and fourth arguments specify the
width and height of the rectangle we want to draw. Now that we've specified a
rectangular path, let's draw the outline of the rectangle on top.

```js
context.stroke();
```

Stroke is one of the "brushes" that we can use to color in a path. The other
common brush is "fill". Let's observe by drawing another rectangle.

```js
context.beginPath();
context.rect(60, 20, 30, 40);
context.fill();
```

Voila! Rectangles! "Stroke" colors in the outline of the path that you specify.
"Fill", well, fills in the outline, much like the paint bucket in MS Paint.

We can modify several things about these rectangles. Let's try changing their
color. The context has several properties that we can play with to allow us to
do so. Two of these properties are "strokeStyle" and "fillStyle". Let's use them.

```js
context.beginPath();
context.rect(110, 20, 30, 40);
context.strokeStyle = "#ff5555"; // Set the color of the "stroke brush" to red
context.stroke();
```

Red outline of a rectangle! Let's draw a blue solid rectangle now.

```js
context.beginPath();
context.rect(160, 20, 30, 40);
context.fillStyle = "#5555ff"; // Set the color of the "stroke brush" to red
context.fill();
```

Can you only draw rectangles with this thing? Of course not! Let's draw a
circle!

```js
context.beginPath();
context.arc(230, 40, 20, 0, Math.PI * 2);
context.fillStyle = "#55ff55";
context.fill();
```

The first two arguments specify the x and y coordinates of the center of the
circle. The third specifies the radius of the circle. The fourth specifies the
starting and ending angles of the "arc" you want to draw. Since we want to draw
a full circle, we start at 0, and end at "two pi" radians, or in other words,
360 degrees.

There are tons of more methods that the canvas and context expose to you to draw
whatever your heart desires. As always, you'll find your answers in
[the docs](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).

### Animation

Animating an object involves performing incremental operations to it at
incremental times, and drawing the result of each operation. We can achieve this
through our good friend, `setInterval`, but we're going to choose a better tool,
namely `requestAnimationFrame`. Read the MDN docs on this function to understand
what it does. Then, run the following example in your console to get a better
sense of how it can be used to repeat an action over and over again.

```js
var start = null;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  console.log("Time elapsed: " + progress + " ms");
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
```

So what's going on here? On the last line, we call requestAnimationFrame and
pass in the function we want our browser to execute, namely `step`. `step` will
print out how much time has passed since the first function call, and then
utilize `requestAnimationFrame` at the very end to schedule it's "next call". In
this manner, it will be executed repeatedly. On most browsers,
`requestAnimationFrame` will execute a function 60 times a second.

So why use this instead of just `setInterval`? That is because of a couple of
reasons.

* `requestAnimationFrame` passes in the time elapsed since first call as an
  argument to your callback function, which is very useful information to have
  when animating. You generally want to know how much time has passed since the
  last animation frame you drew, so that you can draw the next frame correctly.
* `requestAnimationFrame` does some cool optimization. If you switch browser
  tabs to some other page, `requestAnimationFrame` will stop animating, because
  it knows that you aren't looking at the animation anyway.

Sweet. Now, let's put our drawing skills and our `requestAnimationFrame` skills
together to animate a ball!

### A Ball

Time to start putting code in `app.js`. Before we even start, let's model a ball.

```js
// variables to store canvas and context
var canvas, context;

// variable to model ball's position and size
var ball = {
  x: 300,
  y: 300,
  radius: 20
};

// function to draw ball onto canvas
var drawBall = function() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  context.fill();
}

window.onload = function() {
  canvas = document.getElementById('the-canvas');
  context = canvas.getContext('2d');
}

```

Great! Load up your page, and call the `drawBall` function in your console. Our
ball will now be drawn on the canvas! Now let's keep drawing the ball at 60
frames per second, and make sure the ball moves a little bit each time. Let's
change app.js to look like this.

```js
// variables to store canvas and context
var canvas, context;

// variable to keep track of time
var start = null;

// variable to model ball's position and size
var ball = {
  x: 300,
  y: 300,
  radius: 20
};

// function to draw ball onto canvas
var drawBall = function() {
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

  // Move the ball to the right a bit
  ball.x += dt / 10;

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

```

Our ball is moving! But it's leaving a trail! We can fix that by clearing the
canvas every frame before we start drawing the ball's new location. Add this to
the top of the drawBall function.

```js
context.clearRect(0, 0, 800, 600);
```

There you have it. A ball that moves.

If you wanna try something fancy, replace the contents of `app.js` with the code
below, and see what happens.

```js
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

```

This is a very simplified implementation of a ball in a box. I encourage you to
play around with it, watch it fail sometimes, and try to reason as to why it
fails, and how we can prevent it from doing so.

Well, that's all. Happy animating.

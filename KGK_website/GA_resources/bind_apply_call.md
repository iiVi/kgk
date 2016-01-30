# ABCs - Apply, Bind, Call
Three javascript functions you should be aware of

This is just a quick exposure to these functions. See the MDN docs for more advanced examples of how you might use these.

### Call
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call

``Call`` simply lets you call a function with a different this. You also have to pass in the arguments you want to call the function with.

```javascript
var demoFunction = function(arg1, arg2) {
  console.log(this);
  console.log(arg1);
  console.log(arg2);
}

demoFunction("hi", "bye");
// logs the following to the console
// Window {...}
// "hi"
// "bye"

demoFunction.call({foo: "bar"}, "hi", "bye");
// logs the following to the console
// Object {foo: "bar"}
// "hi"
// "bye"
```

### Apply
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

``Apply`` is very similar to ``Call`` except you pass in the arguments to the function as an array.

```javascript
var demoFunction = function(arg1, arg2) {
  console.log(this);
  console.log(arg1);
  console.log(arg2);
}

var argumentsArray = ["hi", "bye"];
demoFunction.apply({foo: "bar"}, argumentsArray);
// logs the following to the console
// Object {foo: "bar"}
// "hi"
// "bye"
```


### Bind
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

``Bind`` lets you set a different this for a function, just like ``Apply`` and ``Call``. It also lets you pass in some or all of the arguments to a function. But it does not call the function immediately. It returns to you an other function that when called will call the original function with the new this set, and with the given arguments already passed in.

```javascript

var demoFunction = function(arg1, arg2) {
  console.log(this);
  console.log(arg1);
  console.log(arg2);
}

var newFunction = demoFunction.bind({foo: "bar"}, "hi", "bye");

newFunction()
// logs the following to the console
// Object {foo: "bar"}
// "hi"
// "bye"

// You don't have to pass in all the arguments. You can pass in some or none, and pass in the rest later when you call the returned function. Here's an example.

var newFunctionWithArgsStillNeeded = demoFunction.bind({foo: "bar"}, "hi");

newFunctionWithArgsStillNeeded("llama")
// logs the following to the console
// Object {foo: "bar"}
// "hi"
// "llama"
```




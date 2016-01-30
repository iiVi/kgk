# Blocks, Procs and Lambdas
#### Closures in Ruby

## What is a closure?

A closure is a function, or method, that will internally maintain the scope of the environment it was defined in, and can be stored in a variable and passed around. If a variable is defined within a closure, it will retain it's value when the closure is used elsewhere. We've used closures before in JavaScript (remember every function in JS is a closure...WUT). No matter where you used a particular function, it always maintained the values of the variables defined within it, and the function could be used anywhere (you could call the function directly, or pass a reference to the function as a callback).

## Blocks

Blocks are closure-like in ruby. They are discrete packets of code that are passed to methods and executed. The first time we used a block was when iterating using `each` and `map`. We called the `each` method on an array object, then passed a block of code that was to be executed by the `each` method for every element of the array. Also, the variables we used within the block of code were only available within that block, and did not bleed out into the rest of our application. BUT the variables defined outside of the block were still available within the block. The block receives it's context from the environment it was defined in, then maintains that scope within itself.

Try this out in Pry:

```
flavor_profile = 'a sweet fruit'

['pear', 'apple', 'cherry'].each do |fruit|
  local_fruit = 'banana'
  puts "#{fruit} is #{flavor_profile}"
end

puts local_fruit
```

The variable `flavor_profile` defined in the same scope as the block (represented by `do..end`) is available within the block itself. The variable `local_fruit` defined within the block is available only to the block (which explains the undefined local variable error that you receive).

What is the problem with blocks? They cannot be stored as objects, therefore they cannot be passed around. Therefore they can not be considered true closures. Luckily Ruby provides us with another tool!

## Procs

A Proc is an object that is used to store blocks of code and pass them around in Ruby. A true closure! Using a proc allows us to define a block that can be used anywhere within our application.

#### How do we define a Proc?

```
add_one = Proc.new { |value| puts(value + 1) }

# OR

add_one = Proc.new do |value|
  puts(value + 1)
end
```

Just like blocks a Proc can be defined with `{}` or with `do...end`

#### How do we utilize them?

You can call a proc directly, just like a function in JS

```
add_one.call(1)
#-> 2 (prints this)
#=> nil (returns this)
```

The proc object is 'called' and whatever value is passed to the `call` method is passed into the proc and stored in the placeholder variable. That value is then used to execute the code defined within the proc.

Remember implicit returns in Ruby? They still apply here. Our proc will return nil because the return value of the final line of code to be executed within the proc will be returned. Try taking out the `puts`, what does the proc return now?

```
[1,2,3].each(&add_one)
```

What's with the weird `&` sign? This a special character used by ruby to indicate that this is a block of code that should be run, not a normal variable that is being passed to the each method.

## Lambdas

A lambda in Ruby is mostly synonymous with a Proc. They are both closure objects that can be used to store and pass around a block of code. But if they are essentially the same why does Ruby give us two?

#### Similarities

Defined and called in a similar fashion

```
my_proc = Proc.new { puts 'HELLO PROC HERE' }
my_lambda = lambda { puts 'HEY LAMBDA YO'}

my_proc.call
my_lambda.call

doubler_proc = Proc.new { |value| puts value + value }
doubler_lambda = lambda { |value| puts value + value }
tripler_lambda = ->(value) { puts value * 3 }

numbers = [1,2,3]

numbers.each(&doubler_proc)
numbers.each(&doubler_lambda)
numbers.each(&tripler_lambda)
```

Lambda's have an alternate syntax called `stabby lambda` notation. It works just the same as the original notation used for procs and lambdas, just with a little more syntactic sugar added.

```
my_lambda = ->(VALUE TO PASS IN THE BLOCK) { BLOCK TO BE EXECUTED }
```

#### Differences

###### Arguments

A major difference between Proc's and Lambda's is how both deal with arguments. Remember in JS when we defined functions with arguments: if we did not provide all of the arguments the function did not error or indicate any problems, it would just run, and any values not provided would be set to `undefined`. Proc's work in this way in Ruby. If we define a proc to accept 3 arguments, if we call it passing only 1 value it will run; if we call it passing no values, it will run. Any values not provided will be assigned a value of `nil`, Ruby's `undefined`.

```
a_proc = Proc.new do |a, b, c|
  puts a
  puts a.class
  puts b
  puts b.class
  puts c
  puts c.class
end

a_proc.call()
a_proc.call(1)
a_proc.call(1,2)
```

Lambda's are not as friendly. A lambda will check that the number of arguments it is given matches the number of arguments it was defined to accept. If we change our previous example to utilize a lambda we get very different results.

```
a_lambda = lambda do |a, b, c|
  puts a
  puts a.class
  puts b
  puts b.class
  puts c
  puts c.class
end

a_lambda.call(1,2,3)
a_lambda.call()
```

The first call using `a_lambda` works as we might expect, it prints out the number and the class of the number. The second call spits out an `ArgumentError`. We defined the lambda to accept 3 arguments, so it will not execute unless it is provided 3 arguments.

###### Returns

The way that procs and lambdas handle return values is another large difference.

Consider the following two methods:

```

def add_one(number)
  my_add_proc = Proc.new { |num| return num + 1 }
  my_add_proc.call(number)

  return 'PROC ADD YO!!'
end

def add_another_one(number)
  my_add_lambda = ->(num) { return num + 1 }
  my_add_lambda.call(number)

  return 'LAMBDA ADD YO!'
end

p = add_one(1)
l = add_another_one(1)

```

If return is used within a proc, when it is executed the program will return out of the proc AND the method where the proc was being used. Our first add one method will NEVER return the string `PROC ADD YO!!` because execution stops when the proc calls `return`.

The second method returns the string as expected. The return used by the lambda will only return out of the block defined by the lambda, NOT the entire method.


## But which one should you use: Proc or Lambda?

ALWAYS PREFER LAMBDA'S. Behavior of a lambda is predictable, behavior of a proc can vary. We want to prefer consistency over non-specificity.

## Lambda's in Rails

[ActiveRecord Scopes](http://guides.rubyonrails.org/active_record_querying.html#scopes) Take a look at this to get an idea of a use case for lambdas with ActiveRecord

## MORE EXAMPLES

```
# define a method that accepts an argument AND a block

my_add_lambda = ->(num) { return num + 5 }

def add(num1)
  yield(num1)
end

add(1, &my_add_lambda)
```

The add method is no longer limited to one type of addition. If we want to use it to add 1 to a number, we can define a lambda that will have the logic within it's block to perform that action. If we want to use it to add 5 to a number, just give it another lamdba! Hrm...sorta like how we have one each method that we provide blocks of code to change its functionality.

Make note of the `&closure`, passed as a variable with this notation used in this case, and the use of the keyword `yield`. Yield will say 'run the block of code that was provided to this method and send back the value'. The method is said to 'yield' to the block, it will do whatever the block asks it to. Think about how we used yield in Rails. We had an application template (`application.html.erb`) with a `yield` in the body. When we visit a page we load the application template, then YIELD to the individual erb provided by our controller actions. That inserts the rendered template into the `application.html.erb` and the full page is sent back to the browser.

Wait...a template is just a type of function right? Functions in ruby are called methods...Our application template method, yields to the view template, the view template is executed and rendered, the return is inserted in the application template, and the fully rendered page is returned.

## A sweet app built to detail the similarities and differences between blocks, procs and lambdas.

[Closures in Ruby](https://innig.net/software/ruby/closures-in-ruby). If this is overwhelming, don't worry, go back later and take another look at it.
blocks_procs_lambdas.md
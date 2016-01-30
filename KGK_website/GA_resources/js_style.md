#Javascript Style Guide

![image of bruce]
(http://media.meltystyle.fr/article-1296730-ajust_930-f77533/bruce-willis-est-habille-d-un-costume-dior.jpg)

Very simply put coding style is how your code looks. By 'your' I mean **YOU**!! This is the amazing thing about coding is that it is very personal and often an extension of the programmer. However due to the team based nature of most projects it is best to follow styling conventions so others can easily read and understand your code.

Some of these conventions include:

* How and when to comment
* How to indent your code
* Appropriate use of white space
* Proper naming of variables and functions

These are just a few of a much longer list of styling conventions to be aware of when writing your code. We are going to review some of the BEST PRACTICES to follow when writing your javscript programs.

# SEMICOLONS

The use of semicolons is an enigma for most developers. The modern browser is nice enough to have a feature allowing for auto semicolon insertion. But that doesn't mean we should be lazy and not use them where they would normally be used.

We can follow a simple set of rules for semicolon usage.

##### ASSIGNMENT

```javascript

    //bad

    var firstName = 'John'
    var lastName = function() {
      return 'McClane'
    }

    //good

    var firstName = 'Bruce';

    var lastName = function() {
      return 'Willis';
    };

```

#####FUNCTION INVOCATION

````javascript

    //bad

    console.log('I have no semi colon')

    unbreakable()

    //good

    console.log('Use a semicolon after me');

    dieHard();

````

#####KEYWORDS THAT ARE COMMANDS

```javascript

    //bad

    new
    catch
    native

    //good

    break;
    return;
    continue;
    debugger;

```

#COMMAS

Commas are used as separators (in argument and parameter lists, array and object literals, etc.)

```javascript

    //bad

    var movies = [
        'Die Hard'
      , 'Armaggedon'
      , 'The Sixth Sense'
    ];

    var hero = {
      firstName: 'John'
     ,lastName: 'McClane'
     ,movie: 'Die Hard'
    };


    //good

    var movies = [
      'Die Hard',
      'Armaggedon',
      'The Sixth Sense'
    ];

    var hero = {
      firstName: 'John',
      lastName: 'McClane',
      movie: 'Die Hard'
    };

```


#WHITESPACE

Whitespace gives code air to breathe and keeps it human-readable.  Conventional spacing allows a developer to have their code readily understood by team members, complete strangers, or even by themselves when looking at their past code.

![Where's Waldo]
(http://data3.whicdn.com/images/62839403/original.jpg)

* Use soft tabs set to 2 spaces.

```javascript

    // bad

    function() {
    ∙∙∙∙var tony;
    }

    // bad

    function() {
    ∙var will;
    }

    // good

    function() {
    ∙∙var jimbob;
    }

```

* Place 1 space between parantheses and curly brackets.

```javascript

    // bad

    function dieHardFive(){
      console.log('Not a very good movie');
    }

    // good

    function dieHard() {
      console.log('Best Xmas Movie Ever!');
    }
```

* Use one space between operators.

```javascript
    // bad

    var x=y+42;

    // good

    var x = y + 42;
```

* Use indentation when making long method chains (cleaner and makes logic seem more apparent line-by-line) and place the method name with period on each new line.

```javascript

    // bad

    $('#thing').spinIt().workIt().flipIt().reverseIt();

    // good

    $('#thing').spinIt()
               .workIt()
               .flipIt()
               .reverseIt();
 ```
 * Leave a blank line after blocks and before the next statement

```javascript

    // bad

    if (day === xmas) {
      return 'good day to die hard';
    }
    return 'maybe watch armageddon';

    // good

    if (day === xmas) {
      return 'good day to die hard';
    }

    return 'maybe watch armageddon';

    // bad

    var obj = {
      foo: function() {
        return 'foo';
      },
      bar: function() {
        return 'bar';
      }
    };
    return obj;

    // good

    var obj = {
      foo: function() {
        return 'foo';
      },
      bar: function() {
        return 'bar';
      }
    };

    return obj;

```

#COMMENTS

Comments are a useful way to explain your code as you write it.  Also, when looking at code for learning purposes, adding comments can aid in understanding similar to pencilling notes or underlining in a textbook.

* Use `/* ... */` for multiline comments.

```javascript
    /*
      This function takes a Die Hard Movie as input.
      It returns a Die Hard Villain as output
    */
    function dieHardVillain(movie) {
      ...code...
    };

```

* Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment.

```javascript
    // This is how you express exponents in JS. This example is 8^2.
    Math.pow(8,2);
```

#NAMING CONVENTIONS

Name things semantically. Names should be descriptive and informative.

* Avoid single letter names. Be descriptive with your naming.

```javascript
    // bad

    function a() {
      return  l * w;
    }

    // good

    function area() {
      return length * width
    }
 ```

* Use camelCase (no spaces, first letter lowercase, every other word beginning uppercase, no spaces/underscores) when naming objects, functions, and instances.

```javascript

    // bad

    var LOLz = {};
    var john_mcclane = {};
    function die hard() {
      return 'yippie-kay-yay....';
    }

    // good

    var lolz = {};
    var johnMcclane = {};
    function dieHard() {
      return 'yippie-kay-yay....';
    }
```

#VARIABLES

Always use `var` to declare variables. Else, GLOBAL VARIABLES will be created. Global variables should be avoided (for reasons that we will explain throughout the course).

```javascript
    // bad

    carlWinslow = 'Also a cop in Die Hard and Die Hard 2';

    // good

    var carlWinslow = 'Also a cop in Die Hard and Die Hard 2';
```


#STRINGS

* A JavaScript string stores a series of characters like 'John Doe'. A string can be any text inside double or single quotes.

Lets start getting into the habit of following these BEST PRACTICES when using our strings moving forward.


#####USE SINGLE QUOTES FOR YOUR STRINGS

```javascript

    var firstName = 'Korben';

    var lastName = 'Dallas';

```

#####LONG STRINGS

If a string is longer than 80 characters long it is BEST PRACTICE to split the string into multiple lines and concatinate(join) the string

```javascript

    //bad

    var mcclaneQuote = 'Ooooh, I\'m very sorry Hans. I didn\'t get that message. Maybe you should\'ve put it on the bulletin board. I figured since I\'ve waxed Tony and Marco and his friend here, I figured you and Karl and Franco might be a little lonely, so I wanted to give you a call.';

    //good

    var mcclaneQuote = 'Ooooh, I\'m very sorry Hans. I didn\'t get that message.' +
    'Maybe you should\'ve put it on the bulletin board.' +
    ' I figured since I\'ve waxed Tony and Marco and his friend here,' +
    ' I figured you and Karl and Franco might be a little lonely,' +
    ' so I wanted to give you a call.';

    //or

    var mcclaneQuote = [
      'Ooooh, I\'m very sorry Hans. I didn\'t get that message.',
      ' Maybe you should\'ve put it on the bulletin board.',
      ' I figured since I\'ve waxed Tony and Marco and his friend here,',
      ' I figured you and Karl and Franco might be a little lonely,',
      ' so I wanted to give you a call.'
      ].join('')

```

# Creating new Arrays

JavaScript arrays are used to store multiple values in a single variable.

```javascript

    // You can create an array using the built-in Constructor

    var johnMcclane = new Array();

    // but literal syntax should be preferred

    var johnMcclane = [];


```


# Creating new Objects

```javascript

    var johnMcclane = new Object();
    johnMcclane.name = 'John McClane';
    johnMcclane.private = false; // You should also try to avoid using reserved words like 'private' when naming variables and properties

    // preferred

    var johnMcclane = {
      name: 'John McClane',
      hidden: false
    }

```

# Object Properties

To access properties of an object, use dot notation instead of subscript notation.

```javascript

    var johnMcclane = {
      name: 'John McClane',
      rank: 'detective',
      dept: 'NYPD'
    }

    // preferred -- to access John McClane's rank
    johnMcclane.rank

    // can also...
    johnMcclane['rank']

```

#FUNCTIONS

Functions should be assigned to a variable.  This is due to scope, hoisting, and other topics that will become clearer throughout the course.

```javascript
    // preferred

    var johnMcclane = function() {
      return 'Just the Fax Ma\'am.';
    };

    // not preferred

    function johnMcclane() {
      return 'Welcome to the party, pal!';
    }

```

To call (use) a function, input the function name followed by ```();```

  ```javascript
    johnMcclane(); // returns 'Just the Fax Ma'am.'
  ```

#TYPE CASTING

Javascript type casts.  This means that Javascript often makes assumptions about the way we want to use datatypes.  Sometimes this is helpful.  Sometimes this is frustrating.  But all of the time, it must be considered when using Javascript.  Here are a few trouble cases to watch for.

 * Equality operator
    -- Use ``` === ``` instead of ``` == ``` for equality comparisons.  ``` === ``` is an exact comparison between two objects; ``` == ``` allows for typcasting.

```javascript

    42 == '42'; // returns true

    // preferred

    42 === '42'; // returns false

```
* Addition operator

    -- Adding a number to a string will typecast the number to a string and append the number to the string.  If you are seeking to add the numerical value of the string to the number, use parseInt().

```javascript
    // string + number = newString
    42 + '42'; // returns '4242'
    'Yippie-Kie-Yay' + 10; // returns 'Yippie-Kie-Yay10'
    10 + 'Yippie-Kie-Yay'; // returns '10Yippie-Kie-Yay'

    // parseInt(string) + number = newNumber or NaN
    42 + parseInt('42'); // returns 84
    parseInt('Yippie-Kie-Yay') + 10; // returns NaN
```

# What is a Regular Expression?

An object in ruby used for pattern matching against strings. It uses a special syntax denoted by `/ /` and a series of matchers in order to build a sequence capable of matching against string characters.

The most basic regular expression just includes string characters between the forward slashes: `/hello/`. This expresssion, or regex, can be used to match against `'hello'`, `'hellow'`, or a longer string `'Always say hello to the doorman'`. In each case the regular expression would search through the string searching for a collection of characters that matches those written in the regex. The end of the regex will accept an option `/hello/i`. This option will inform your method to make case-INsensitive matches using your regex. So, given `/hello/i`, this regex can be used to match both `'hello'` and `'Hello'`. To build more complex regular expressions you can use the matchers that the language provides you below.

Some commonly used matchers are:

![matchers](http://i.imgur.com/fvatHPG.png)

_In general most of the matchers are the same in Ruby and JavaScript. There are a handful of extra matchers or functionality that both languages choose to implement, but you can rest assured that most regexes written for ruby will work for javascript._

### Using Regexes

A couple of useful methods available for regex objects are:

`REGEX === string`

- this will return true or false based on whether the regex was able to find a match within that string

`REGEX =~ string`

- this will return the index of the first match that was found within the tested string
- if none is found it will return `nil`

`(REGEX).match(string)`

- this will return a [Matchdata](http://www.ruby-doc.org/core-2.2.0/MatchData.html) object if a match is found within the test string
  - the Matchdata object is very similar to an array in that it is index by integers and has some general 'order'
  - the order is dictated by the order of matches found in the string
  - the first value of the Matchdata object will always be the string that matched the entire regular expression
- if none is found it will return `nil`

A couple of string methods available for use with regexes are:

`string[REGEX]`

- this will return the string the section of the string that matches the REGEX or `nil`

`string.scan(REGEX)`

- this will return an array with all of the matches found within the string. Compare the function of `scan` with `match`

`string.gsub(REGEX, replacement_string)`

- this will take two arguments: a regular expression, and a replacement string. It will search for the regex within the string, and substitute all occurences of a match with the replacement string you provide

`string.index(REGEX)`

- this will return the index of the first match found within the string.


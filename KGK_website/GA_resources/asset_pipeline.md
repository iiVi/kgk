# The Rails Asset Pipeline
![Rails](http://png-4.findicons.com/files/icons/1607/ruby_on_rails/256/ror_folder_256_v3.png)
# What is the Asset Pipeline?

The asset pipeline is a feature of Rails that attempts to organize all of the assets of your application in one place, and provides a set of tools for preparing your assets for deployment to a production environment. It's all about performance once an application is in production.

# What are assets?
- Images
  - png
  - jpg
  - gif
- JavaScripts
  - Vanilla JavaScript files
  - CoffeeScript files
- Stylesheets
  - CSS files
  - SASS/SCSS files

# What does the Asset Pipeline do?
- Concatenation
- Fingerprinting
- Minification
- Pre-compilation

#### Concatenation
Each asset folder (javascripts, stylesheets) has a main file that acts as the base. For JavaScript its called `application.js`, for CSS its called `application.css`. It is very important to not modify the standard text at the top of these files. They may seem like they are only comments but they are actually configuration details that Rails needs to organize and build your assets.

You might see something like this at the top of your `application.css` file:

```
*= require_tree .
*= require_self
```

This is the load order of the stylesheets. Rails will load all other CSS files in the `stylesheets` directory (require_tree .) then load the application.css stylesheet itself.

You might see something like this at the top of the `application.js` file:

```
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
```

By default Rails includes jQuery, it's own flavor of jQuery (UJS), and something called [turbolinks](http://railscasts.com/episodes/390-turbolinks). After those libraries are loaded then rails will load all of the `.js` files in the javascripts directory, then the application.js file itself.

Since most projects will have many different stylesheets and javascripts it would get unwieldy trying to send all of this to the browser, and having the browser process all of these files. In development, this is fine, but in production performance would take a major hit. Rails solves this by **concatentating** all of the assets into one file. All of the CSS files are loaded and one large manifest CSS file is created and sent to the client. The same occurs for all of the JS files.

**Concatenation** is, simply put, the process of combining all related asset files into one single file, which is then sent to the client. Instead of making requests for an unknown number of asset files, the browser can make a single request and receive everything in one go.

#### Fingerprinting
Rails will also do something known as `fingerprinting`. A unique **fingerprint** is added to each master file's filename. To speed up load times for a site the browser will keep a cache of all assets. If you visit multiple pages in one session, the browser will not have to go back to the server to repeatedly retrieve assets, it will just use the copy that it has cached. When a request is made it checks the fingerprint on the assets, if there is a new fingerprint then the browser will download a new copy of the assets and cache it. But only on an as needed basis.

**Fingerprinting** does not occur in the development environment or the test environment and is configured to only occur when moving to a production environment. Just like _concatenation_.

#### Minification / Uglification / Compression

The Asset Pipeline performs a job called `minification`. Once all of the assets have been concatenated, Rails will go one step further to increase performance in the browser. Minification with regard to CSS is the process of removing whitespace and any comments in the CSS files. Minification with regard to JSS is the process of removing variable names, whitespace, comments. Also, every single line of JS or CSS code that is written is condensed and compressed into a single line.

The reasons for this:

- when we are in development we need to have semantic words and separation of information to be able to parse and understand what it is that we are doing, the browser does not.
- it is faster for the browser to read and process a single line of text than to process 1000 separated lines of text. Remember the asset pipeline is all about performance!

#### Pre-Compilation

There exist many different tools to make development in JS and CSS simpler, more ruby-like in certain instances, and more efficient for the developer. A few of the tools that are native to Rails are [SASS](http://sass-lang.com/) and [CoffeeScript](http://coffeescript.org/). These tools allow the developer to use a special DSL for organizing and writing code. The only problem is that this DSL is not something that is natively understood by the browser.

That's where the Asset Pipeline comes into play. It will **pre-compile** these special assets (.coffee, .sass files) into vanilla JS and CSS that is understandable by all browsers. It also does the job of evaluating any embedded ruby that is in your asset files. (LOLWUT you can have ruby in your CSS?!? YES! RAILS! WIN!!)

# Embedding Ruby in your assets

Adding Ruby to your assets files is fairly simple. If the file that you are using is a basic CSS or JS file then it is as easy as adding the `.erb` file extension to the file. So for a stylesheet it would be `<somefilename>.css.erb`. For a JS file it would be `<somefilename>.js.erb`.

Inside of the actual stylesheet you can use the standard erb tags (<%= %>) to insert your code. There is one caveat however: standard file paths will not work. In development using absolute paths will function normally, but when the assets are run through the precompiler Rails will not know how to build those file paths. In order for it to work you have to follow the conventions of Rails by using asset helper tags.

Some common helpers are:

For images:

```
<%= image_path 'path_to_image' %> (in an asset file)
=> /images/path_to_image

<%= image_tag 'path_to_image' %> (in a view)
=> <img src='/images/path_to_image'>
```

For audio:

```
<%= audio_path 'path_to_audio_file' %> (in an asset file)
=> /audios/path_to_audio_file

<%= audio_tag 'path_to_audio_file' %> (in a view)
=> <audio src='/audios/path_to_audio_file'>
```

For example in a stylesheet you might write something like this:

```
.class {
  background-image: url(<%= image_path 'image.png' %>)
}
```

# One more thing!

There are two main assets directories that we will often use in Rails:

#### app/assets
This is the directory used to house any and all code that you've written yourself

#### vendor/assets
This is the directory used to store any external stylesheets or javascript libraries you've included. I.E. code that you did not write yourself:

- framework code like Bootstrap or Foundation
- library code like Backbone.js or Underscore.js

If you put assets in the vendor directory then you must manually require them in the `application.css` or `application.js` file in the header text

```ruby
## In application.js ##

//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require underscore
//= require backbone
//= require handlebars
//= require_tree ./backbone/routers
//= require_tree ./backbone/models
//= require_tree ./backbone/collections
//= require_tree ./backbone/views
//= require_tree ./templates
//= require_tree .
```

Here I've required the standard JS stuff like jQuery, UJS, and turbolinks, then beneath I required libraries that I included that are stored in my `vendor/assets` directory.

##### Resources
- [Asset Pipeline - Rails Guide](http://guides.rubyonrails.org/asset_pipeline.html)
- [Asset Pipeline - RailsCast](http://railscasts.com/episodes/279-understanding-the-asset-pipeline)

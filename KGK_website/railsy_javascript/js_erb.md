# Building a Single Page App the RAILS way

 This guide will be a short walkthrough of the RAILS'y way of building a Single Page Application. Using the internal tools of Rails, like `jQuery`, `unobtrusive JavaScript`, and `turbolinks` it is possible to build a SPA that doesn't require a Front-End framework like Backbone.

### Files and directories that are important:

- `app/models/item.rb`
- `app/controllers/items_controller.rb`
- `app/views/items`
- `app/assets/javascripts/application.js`

## Model

Of note in the `item.rb` is an ActiveRecord Callback. These allow us to have certain actions happen during an ActiveRecord transaction. Here I've used a callback to make sure that before an item is saved to the database on creation that its completed attribute has been set to false. This is done because the user is not submitting a form that gives them the option of setting an item's completion state to be false. When `Item.create` is called, before the model data is saved in the database it will set the completed attribute.

It is important to note that I return the model object at the end of this method. If a callback method related to save returns a falsey value, the model will not be saved. Returning `self` ensures that the model will always be saved since the model object itself is a truthy object.

[AR Callbacks](http://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html)

## Controller + View

The controller that I've defined looks alot like the controllers that we have used in the past. I defined 4 actions: `index, create, update, destroy` (to perform the CRUD actions of an item model).

### index -> index.html.erb

The `index` action will be used as the root of our application. When the page loads, all item models will be retrieved from the database and passed to the view to be rendered (`@items`). The variable `@item` is defined and set to an initialized model object because we will need it for our new item form. Remember, `form_for` in Rails will take a model object as a parameter and build a Rails-y form for it. This controller action will respond to normal HTTP get requests.

### create -> create.js.erb

The `create` action is a little different from what we've seen so far. The major difference is the type of response that the action will deliver. Previously we've used `respond_to` to send both html reponses to the browser, and to send json responses. Rails gives us another way of responding to certain requests. Instead of sending back an html representation of a page to the browser, or a JSON-ified object version of a model, we can ask Rails to send back JavaScript to the browser, that will be executed and run on the client side. __LOLOLOLOWUTDOE__. I'll repeat that: we define some javascript view file attached to a particular controller action, and when a request is submitted to that action, it does not respond with JSON, or HTML, but with the actual JavaScript code from the view file we defined. This code is sent to the browser, then executed. Each request sends only enough JavaScript to affect a change on the page for whatever triggered the request. This also means that the page will not reload, since a full HTTP request is not being triggered.

What is a `.js.erb`? It's a JavaScript file that will be compiled in the following way: first, any ruby code that exists will be executed, and substituted in place; next, the file will be processed as a normal JS file might. This pre-processed JavaScript file is what is sent back to the browser as the response to the request that triggered the initial action. This file, once received by the browser will be executed, like any normal JavaScript code. Inside of the `.js.erb` files that we define we are going to put the jQuery code that is necessary to update the DOM after the request has been completed.

To understand how this all works we have to understand some of the components involved. You'll notice that our `form_for` has an extra option attached to it: `remote: :true`. This is what makes all of the magic happen. Through the use of `turbolinks and UJS`, when this form is submitted, it will prevent the default action from happening (firing off a request to the server, redirecting to another action, triggering a full HTTP request and page reload). Instead, the form will be submitted via a __remote__ request through AJAX to our server (no longer going to reload the page). The server upon receiving the request will process it and return the `js.erb` file semantically connected to that controller action. In our case `create action => create.js.erb`.

In the `create.js.erb` for the create action you will see some very simple JavaScript code. First, it selects the todo list's container. Then we create the todo item. Then we append it to the todo list container. _But what's that weird `j()` thing??_ The `j()` is a Ruby method that is shorthand for `escape_javascript()`. This will make sure that whatever Ruby code is placed in this JavaScript code will play nicely. It will make sure that all double and single quotes are escaped, and that there are no other special characters that might cause the translation from Ruby to JavaScript to fail. Also, this file is being built on the server side, so we have access to all helpers that Rails provides. You can take advantage of methods like the `render` for rendering your Rails partials and forms. Also, since this is a view, connected with a controller action the instance variables defined on the controller are available within the view.

__RECAP__

The `@item` object is passed from the controller to the `create.js.erb` view file. The partial defined for an item is used to render out the `@item` object which returns a long string of HTML. Next the `j()` method will make sure to escape any characters safely for JavaScript. So combined `<%= j( render @item ) %>` will return a JavaScript-safe string of HTML. Now we wrap that in cash, converting that html string into a jQuery object, which we append to the todo list container.

The update and destroy actions work just the same. Take a look at the `.js.erb`s defined for those actions alongside the Items controller.

## Item Partial

The item partial makes use of a Rails helper called a `content_tag`. This is a helper much like the `link_to` and `form_for` helpers that allow you to write Ruby code that will be converted into valid HTML. The content tag will create any HTML element you want, and apply any id/class/data attribute you would like to the element. If given a block it will allow you to place other elements inside of the newly created element. Here I make a div with a class of item and a unique id. Within that div I placed a p tag, a checkbox (remote true), and a delete button (remote true).

#### More Resources

- [Unobtrusive JavaScript](http://guides.rubyonrails.org/working_with_javascript_in_rails.html#unobtrusive-javascript)
# The Final Push
###### You are now entering the...Production Zone

#### Repo Structure

Add the `sequelize-cli` package to your list of dependencies.

You repository should have the following structure:

```
my_suite_app/
  |_ bin/ (if using backbars)
  |_ config/
  |_ migrations/
  |_ models/
  |_ node_modules/
  |_ public/
  |_ package.json
  |_ server.js
```

You have to make sure that all of the files and directories necessary for your application are on the root level. If they are not, Heroku will not know where to look or how to start your application.

#### Procfile

In the main directory of your application create a new file called `Procfile`. You do not need to add a file extension.
Add the following line to the `Procfile`

```
web: node server.js

// or if you are using backbars

web: node bin/www
```

The `Procfile` is used to let Heroku's computer know how to start your application. Since we are no longer in development, we are not going to be responsible for starting up our server. The `Procfile` will act as a sort of configuration file for Heroku.

#### Heroku App Creation/Configuration

Within your repository do the following:

* `heroku create`
  - You might be prompted to enter your Heroku credentials
  - Note the name of the application that heroku creates
* `git add .`
* `git commit -m "the final push"`
* `git push heroku master`

> Now tell heroku that we are going to be using a postgres database `heroku addons:add heroku-postgresql:dev`

Your app has now been deployed! But there's some more configuration we have to do.

#### Database Config

While you were working on your app locally you were using the development database. In production you have to make sure that you set up and configure our production database. To do that you have to make some edits to the `config.json` and `index.js` files.

##### config/config.json
```js
{
  "development": {
    "username": null,
    "password": null,
    "database": "my_suite_app_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}
```

##### models/index.js

Log into your Heroku account and click on the application that you've just created. It should have a name like `glacial-wave-1524`. Look for the line that tells you the name of your database. It will look something like: `Heroku Postgres :: Green`. Make note of the color.

Add the following code after you've noted the 'color' of your Heroku database

```
// require statements and variable declarations
// ...

if (process.env.HEROKU_POSTGRESQL_[COLOR OF YOUR DATABASE]_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_[COLOR OF YOUR DATABASE]_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      logging:  true //false
    })
  } else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

// var db = {}
// ...
```

#### Migrations

This will migrate all of your database tables.

`heroku run sequelize db:migrate --env production -m --app [name of your heroku app]`

#### Congratulations, You've won!

`heroku restart` -> to restart our server and make sure all of our configuration details are up-to-date

`heroku open` -> to open up your app in the browser

If there are errors, you can use the command `heroku logs` to get a print out of the production logs for your application. These are just like the logs we had printing to our console in development mode. Search for what caused your application to crash and debug. Remember any changes you make to your application locally will require you to add, commit, and push to heroku again. You **do not** need to repeat the database configuration.
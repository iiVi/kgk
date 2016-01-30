## Getting your app up on Heroku

First, go into your project repo directory.

Run the command below and login into Heroku using your account information.
```bash
heroku login
```

Add the Heroku remote to your git repo by running the command below.
```bash
heroku create
```

We can check that it worked by running the following command. We should see push and fetch urls for Heroku in the list
```
git remote -v
```

Add the 12factor gem by copying the following snippet into your project Gemfile.
```ruby
gem 'rails_12factor', group: :production
```

Run bundle install to actually get the 12factor gem.
```bash
bundle install
```

Commit the changes to your Gemfile and Gemfile.lock, and get them pushed and merged into master.
```bash
git add Gemfile
git add Gemfile.lock
git commit -m "adding 12factor gem"
git push origin <my_branch_name>
# go to github and submit a new pull request
```

After your pull request has been merged, switch to your master branch and get the latest changes.
```bash
git checkout master
git pull origin master
```

Push our app to Heroku
```bash
git push heroku master
```

Run rake db:migrate up on Heroku.

Note: If you see ``stty: standard input: unable to perform all requested operations`` after running this command, don't worry just ignore it, and ignore it if you see it again when running any command that     looks like ``heroku run ...``
```bash
heroku run rake db:migrate

```

Run rake db:seed up on Heroku, if you have a seed file
```bash
heroku run rake db:seed
```

Check out our hopefully working app in the browser
```bash
heroku open
```

If your app isn't working correctly, check the logs. Use the commands related to logs listed below.

## Updating your app on Heroku

Get the latest version of master from origin
```bash
git checkout master
git pull origin master
```

Push latest changes to Heroku
```bash
git push heroku master
```

Run rake db:migrate up on Heroku (if you changed your schema in anyway)
```bash
heroku run rake db:migrate
```

Check out you updated app
```bash
heroku open
```

## Useful commands to do things up on Heroku

##### Look at most recent Rails logs
```bash
heroku logs
```

##### Get a live view of the Rails logs
You'll have to use ctrl-c to exit out of the live view
```bash
heroku logs --tail
```

##### View info about our app
```bash
heroku info
```

##### Open up the Rails console
```bash
heroku run rails console
```

##### Open psql
```bash
heroku pg:psql
```

##### List info for dbs
There should be only one db. This command is mostly useful to get the name of your db.
```bash
heroku pg
```

##### Resetting the db
You do the following command on Heroku instead of doing ``rake db:drop db:create`` which you normally do when running locally.
```bash
heroku pg:reset <db_name>
```

##### Restarting you app
```bash
heroku restart
```


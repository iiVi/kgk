# Deploying to DigitalOcean

# Create a droplet

- name it!
- 64 bit install of ubuntu!
- add your ssh public key (from your ~/.ssh folder locally)
- ssh into your newly created droplet `ssh root@IPADDRESS`
	- if you already had a known host you might have to run `ssh-keygen -R IPADDRESS`

Now we are connected to a computer somewhere else in the world! Can interact with it only through the command line!!

# Configure your droplet environment

- `apt-get update` (updates your installed packages)
- `apt-get install git`
- `apt-get install ruby`
- `apt-get install bundler`
- `apt-get install postgresql postgresql-contrib libpq-dev`

# Configure postgres for your root user

- `sudo -i -u postgres`
- `createuser -s root`
- `createdb root`
- `exit`

# RESTART YOUR DROPLET! 
- `shutdown -r now`

# Clone your application

- `cd ~/home`
- `git clone YOUR_REPO_HTTP_CLONE_LINK`

# Rails config

you can make changes to files using the text editor ``nano`` which is already installed on your virtual machine.

- `cd RAILS_PROJECT_DIR` (go into your rails project directory)
- uncomment the `rubyracer` gem in your Gemfile and run ``bundle install``
- remove your username and password fields from the production settings in your `config/database.yml` file

- run `rake secret` to generate a secret key base, and add it to your `~/.bashrc` file as an environment variable `SECRET_KEY_BASE`. Make sure to run `source ~/.bashrc` to reload your bash profile. You can do this all quite simply with the following two commands with the following snippet.

```bash 
echo "export SECRET_KEY_BASE=\"`rake secret`\"" >> ~/.bashrc
source ~/.bashrc
```

- run `bundle exec rake assets:precompile` 
- set serve static assets to true in the `config/environments/production.rb` file.

#### Database setup

- `bundle exec rake db:create db:migrate db:seed`

# Start your server as a background process 
- `rails s -e production -d -p 80`

# Stopping your server process

- ``ps -A | grep ruby``
	- One of the lines output will be your ruby server process. Copy process id on the far left side of the line.
- ``kill PROCESS_ID_OF_YOUR_RUBY_SERVER``

- ``ps -A | grep ruby`` (check to see if you ruby server process is no longer listed)

- ``kill -9 PROCESS_ID_OF_YOUR_RUBY_SERVER`` (this is kind of like force quit. Do this if the previous kill command didn't stop your ruby server process.)
	


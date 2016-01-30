# Setting up a new app with NPM:

### `npm init`

This will create a package.json where we will store all of the dependencies for our application.

### `npm install --save [package name]`

This will download a package, and add it to a 'dependencies' object in your package.json. It will also store the downloaded package in a `node_modules` folder. Ex. We install _express_ this way.

### `npm install -g [package name]`

 This will download a package and store it __globally__ on your system. It will _not_ add a dependency to your package.json because we are installing this package for our computer, not an application we are building. Ex. We install the _sequelize-cli_ this way.

 You should __NEVER__ store any application files inside of the `node_modules` folder. It is __ONLY__ for node packages.

### Packages for Sequelize

- `pg`
- `pg-hstore`
- `sequelize`

# Setting up an app with Sequelize

Once you have set up the basic NPM install (package.json, downloaded and installed all application dependencies):

From the command line:

### `createdb [database for your application]`

This is the psql command that will create a new database on your computer

### `sequelize init`

This is the sequelize command that will set up a basic install for sequelize in our application. It creates:

- config/
	- config.json
- models/
	- index.js
- migrations/

###### Config

The config.json file is used to configure our connection with our database. It allows you to input a username and password (if necessary), the location to find the database (host), the name of the database to connect to, and which DBMS you are using to talk to your database (dialect).

###### Models

The index.js file is used to load in all of our individual model files and export them for use in the rest of our application. We will store any models we create for our application here. Each model we create is going to be associated with a particular table, i.e. `User Model -> users table`. We will use the Model constructor we define to gain access to that particular table and perform the CRUD actions for it.

###### Migrations

A migration represents a 'state' or representation of our database at a certain point in time. Each migration therefore is timestamped, so we can keep track of them in order. Every migration also has two functions: `up` and `down`. The up function is run to update the state of the database (create a table, add a column, remove a column) and the down function is run to revert the database to a previous state (remove a table, remove a column, add back a column that was removed).

Migrations, once they are run, should __NEVER__ be changed. If you want to change or update your database, you __ALWAYS__ make a new migration.

The migrations folder will hold all of the migrations for our application.

### `sequelize model:create`

To generate a migration and a model we can use the sequelize command line functionality.

#### `sequelize model:create --name [name of your table] --attributes "attr1:datatype, attr2:datatype"`

Once you have generated your migration, remove the `createdAt` and `updatedAt` attributes (we don't need those just yet)
Before the classMethods pair in your model options, add `timestamps: false`

### `sequelize db:migrate`

This command is used to migrate, or update the state, or your database. It will do the job of creating tables and assigning the appropriate datatypes to each column.

### Congratulations, you've won!!

You've just set up your node modules, database, and sequelize models for your application!


# Sequelize functions

###### CREATE

```
Model
	.create(params)
	.then(function(newModel) {
		console.log('New Model created');
		console.log(newModel);
	});
```

This will create a new entry, store it in the database, and pass the resulting object that was created to the callback for `then`

###### READ

```
Model
	.findOne(id)
	.then(function(modelObject){
		console.log(modelObject);
	});
```

This will retrieve a single entry from the database by ID number, and pass the resulting object to the callback for `then`

```
Model
	.findAll()
	.then(function(arrayOfModels) {
		arrayOfModels.forEach(callback);
	});

Model
	.findAll({ where: { attr1: value } })
	.then(function(arrayOfModelsWhereAttr1) {
		arrayOfModelsWhereAttr1.forEach(callback);
	});
```

This will retrieve all entries from the database, and pass the resulting objects to the callback as an array. If given an object of options, only the database entries that match the condition will be retrieved.

###### UPDATE

```
Model
	.findOne(id)
	.then(function(modelObject){
		modelObject
			.update(params)
			.then(function(updatedModel) {
				console.log(updatedModel);
			});
	});
```

This will retrieve an entry from the database, then update it. The updated object will be passed to the callback for `then`

###### DESTROY

```
Model
	.findOne(id)
	.then(function(modelObject){
		modelObject
			.destroy()
			.then(function() {
				console.log('Delete the model');
			});
	});
```
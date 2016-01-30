# How To Rails

## Getting Started

Make a new Rails app

```bash
rails new my_cat_app --database=postgresql
```

---

Create your databases

```bash
rake db:create
```

---

Create your migrations

```bash
rails generate migration CreateCats

# or

rails generate migration create_cats
```

---

Run your migrations

```bash
rake db:migrate
```

---

Create your models (ex. `app/models/cat.rb`)

Write stuff in your seed script (`db/seeds.rb`)

Run your seed script

```bash
rake db:seed
```

---

Start your server

```bash
rails server

# or

rails s
```

## Useful things

* `rake routes` - View the routes that your server currently handles
* `rake -T` - View available rake tasks
* `rails console` - Open up a "playground"

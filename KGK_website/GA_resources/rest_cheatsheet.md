# REST Cheatsheet

Cheatsheet for the seven RESTful (deadly) routes

| Title   | Verb      | Path               | User wants to                  | Server responds with             |
| -----   | ----      | ----               | -------------                  | --------------------             |
| Index   | `GET`     | `/things`          | Get all things                 | A view containing all the things |
| Show    | `GET`     | `/things/:id`      | Get one thing                  | A view containing one thing      |
| New     | `GET`     | `/things/new`      | Get a form to make a new thing | A view containing a form         |
| Create  | `POST`    | `/things`          | Create a new thing             | A redirect                       |
| Edit    | `GET`     | `/things/:id/edit` | Get a form to edit a thing     | A view containing a form         |
| Update  | `PUT`     | `/things/:id`      | Update a thing                 | A redirect                       |
| Destroy | `DELETE`  | `/things/:id`      | Delete a thing                 | A redirect                       |

# WanderLust-like Flats Booking

A simple flats booking web app with a RESTful API, MVC structure, authentication & authorization. Built with Node.js, Express, Mongoose and EJS templates. Validation and middleware features use Joi, Passport and custom helpers.

## Features

- Create, read, update, delete flat listings (RESTful)
- User signup / authentication with Passport
- Server-side validation and middleware (Joi, custom wrappers)
- EJS views with layouts & partials
- Flash messages for user feedback

## Technologies

- Node.js, Express
- MongoDB + Mongoose
- EJS (views/templates)
- Passport for auth
- Joi for request validation
- Custom middleware (`util/wrapAsync.js`, `util/ExpressError.js`)

## Quick start

Install dependencies:

```sh
npm install
```

Run the app:

```sh
npm nodemon index.js
```

Open http://localhost:3000 (or the port configured in index.js).

### Project structure

Top-level files:
.gitignore
index.js
package.json
README.md
schema.js

### Directories and files:

classroom/server.js
classroom/views/page.ejs
init/data.js
init/index.js
models/listing.js
models/review.js
models/user.js
public/script.js
public/style.css
public/style1.css
routes/listingRoute.js
routes/reviewRoute.js
routes/userRoute.js
util/ExpressError.js
util/wrapAsync.js
views/edit.ejs
views/error.ejs
views/index.ejs
views/new.ejs
views/show.ejs
views/includes/flash.ejs
views/includes/footer.ejs
views/includes/navbar.ejs
views/layouts/boilerplate.ejs
views/user/signup.ejs

#### Notes:

Routes are organized under the routes folder (see routes/userRoute.js, routes/listingRoute.js, routes/reviewRoute.js).

Models live in models (see models/listing.js, models/review.js, models/user.js).

View templates are under views with includes and layouts for reuse.

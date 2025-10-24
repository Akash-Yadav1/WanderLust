const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./util/ExpressError.js");
const session = require("express-session");
const falsh = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRoute = require("./routes/listingRoute.js");
const reviewRoute = require("./routes/reviewRoute.js");
const userRoute = require("./routes/userRoute.js");

const db_URL = "mongodb://127.0.0.1:27017/airbnb";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionOption = {
  secret: "mysecretstring",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 100,
    maxAge: 7 * 24 * 60 * 60 * 100,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(falsh());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function main() {
  await mongoose.connect(db_URL);
}

main()
  .then((res) => {
    console.log("Connection setup");
  })
  .catch((err) => {
    console.log(err);
  });

//Listing
app.listen(8080, () => {
  console.log("Server listening at 8080");
});

app.get("/", (req, res) => {
  res.send("Server connected");
});

// Testing all listing route
// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My new villa",
//     description: "By the beach",
//     price: 12000,
//     location: "Goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("sample saved");
//   res.send("sample saved and test passed");
// });

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "test@gamil.com",
    username: "test",
  });
  let registerUser = await User.register(fakeUser, "helloworld");
  res.send(registerUser);
});

//Listing
app.use("/listings", listingRoute);

//Reviews
app.use("/listings/:id/reviews", reviewRoute);

//User
app.use("/", userRoute);

//middleware for 404 not found
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
  // res.status(status).send(message);
});

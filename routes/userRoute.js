const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");

router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ email, username });
      let registerUser = await User.register(newUser, password);
      console.log(registerUser);
      req.flash("success", "User is registered");
      res.redirect("/listings");
    } catch (err) {
      req.flash("error", "Dublicate data entered");
      res.redirect("/signup");
    }
  })
);

module.exports = router;

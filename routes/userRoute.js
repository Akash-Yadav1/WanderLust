const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware/loggedin.js");
const {
  renderSignup,
  signup,
  renderLogin,
  login,
  logout,
} = require("../controllers/userController.js");

router.get("/signup", renderSignup);

router.post("/signup", wrapAsync(signup));

router.get("/login", renderLogin);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(login)
);

router.get("/logout", logout);

module.exports = router;

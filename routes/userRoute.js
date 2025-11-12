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

//signup
router.route("/signup").get(renderSignup).post(wrapAsync(signup));

//login
router
  .route("/login")
  .get(renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(login)
  );

//logout

router.route("/logout").get(logout);

module.exports = router;

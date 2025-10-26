const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
  res.render("user/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    let registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "User is registered");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", "Dublicate data entered");
    res.redirect("/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You logged out");
    res.redirect("/listings");
  });
};

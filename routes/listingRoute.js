const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync.js");

const { isLoggedIn } = require("../middleware/loggedin.js");
const { validateListng } = require("../middleware/validateModel.js");
const { isOwner } = require("../middleware/Owner.js");
const {
  index,
  createListing,
  show,
  renderEdit,
  edit,
  deleteListing,
} = require("../controllers/listingController.js");

//Index Route
router
  .route("/")
  .get(wrapAsync(index))
  .post(isLoggedIn, validateListng, wrapAsync(createListing));

//New Listig Route
router.route("/new").get(isLoggedIn, (req, res) => {
  res.render("new.ejs");
});

//Show Route
router
  .route("/:id")
  .get(wrapAsync(show))
  .put(isOwner, wrapAsync(edit))
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

//Edit Route
router.route("/:id/edit").get(isLoggedIn, isOwner, wrapAsync(renderEdit));

module.exports = router;

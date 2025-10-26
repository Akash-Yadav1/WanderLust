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
router.get("/", wrapAsync(index));

//New Listig Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("new.ejs");
});

//Create Route
router.post("/", isLoggedIn, validateListng, wrapAsync(createListing));

//Show Route
router.get("/:id", wrapAsync(show));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEdit));

router.put("/:id", isOwner, wrapAsync(edit));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;

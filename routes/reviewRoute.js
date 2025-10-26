const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../util/wrapAsync.js");
const { validateReview } = require("../middleware/validateModel.js");
const { isLoggedIn } = require("../middleware/loggedin.js");
const { isAuthor } = require("../middleware/Owner.js");
const { review, deleteReview } = require("../controllers/reviewController.js");

//Post Review route
router.post("/", isLoggedIn, validateReview, wrapAsync(review));

//Delete Review route
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(deleteReview));

module.exports = router;

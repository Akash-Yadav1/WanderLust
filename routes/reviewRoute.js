const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/ExpressError.js");

function validateReview(req, res, next) {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let err = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, err);
  } else {
    next();
  }
}

//Post Review route
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);
    listing.reviews.push(review);

    await review.save();
    await listing.save();

    req.flash("success", "New Review Added");
    res.redirect(`/listings/${listing._id}`);
  })
);

//Delete Review route
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;

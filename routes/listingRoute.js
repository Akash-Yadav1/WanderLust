const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../util/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../util/ExpressError.js");

function validateListng(req, res, next) {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let err = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, err);
  } else {
    next();
  }
}

//Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
  })
);

//New Listig Route
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

//Create Route
router.post(
  "/",
  validateListng,
  wrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Added");
    res.redirect("/listings");
  })
);

//Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing Does not Exists");
      return res.redirect("/listings");
    }
    res.render("show.ejs", { listing });
  })
);

//Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing doesn't exist");
      return res.redirect("/listings");
    }
    res.render("edit.ejs", { listing });
  })
);

router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
  })
);

//Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  })
);

module.exports = router;

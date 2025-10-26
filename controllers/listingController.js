const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("index.ejs", { allListings });
};

module.exports.createListing = async (req, res) => {
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Added");
  res.redirect("/listings");
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: "author" })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing Does not Exists");
    return res.redirect("/listings");
  }
  res.render("show.ejs", { listing });
};

module.exports.renderEdit = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing doesn't exist");
    return res.redirect("/listings");
  }
  res.render("edit.ejs", { listing });
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

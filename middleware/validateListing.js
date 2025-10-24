const { listingSchema } = require("../schema.js");
const ExpressError = require("../util/ExpressError.js");

module.exports.validateListng = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let err = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, err);
  } else {
    next();
  }
};

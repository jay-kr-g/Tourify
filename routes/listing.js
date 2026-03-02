const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const {listingSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer =  require('multer');

const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Index route //Create route (Merge)
router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
);

//New route (should define top of /:id path)
router.get("/new",isLoggedIn,listingController.renderNewForm);

//Show route //Update route //Delete Route (merge)
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListings)
);

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;
const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewsController = require("../controllers/reviews.js");

//Reviews
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewsController.reviewCreate));

//Delete-Review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewsController.reviewDelete));

module.exports = router;
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//Create Review
module.exports.reviewCreate = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author  = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("New review saved");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

//Delete Review
module.exports.reviewDelete = async(req,res)=>{
    let {id,reviewId}= req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId); 
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};
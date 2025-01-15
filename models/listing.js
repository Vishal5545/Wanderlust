const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { string } = require("joi");

const defaultImageUrl =
  "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?ixlib=rb-1.2.1&w=1000&q=80";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true, // Corrected 'require' to 'required'
    trim: true, // Removes leading/trailing whitespace
  },
  description: {
    type: String,
    trim: true,
    default: "No description provided.",
  },
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  // category:{
  //   type:String,
  //   enum:["mountains","arctic","farms","deserts"]
  // }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

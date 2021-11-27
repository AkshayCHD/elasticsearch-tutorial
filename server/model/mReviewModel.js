const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, default: "", required: true },
  space: { type: String, default: "", required: true },
  summary: { type: String, default: "", required: true },
  description: { type: String, default: "", required: true },
  notes: { type: String, default: "", required: true },
  pop: { type: Number, required: true, default: 0 },
});
const Review = mongoose.model("review", reviewSchema);

module.exports = Review;

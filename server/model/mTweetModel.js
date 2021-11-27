const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  text: { type: String, default: "", required: true },
  user: { type: String, default: "", required: true },
});
const Tweet = mongoose.model("twt", tweetSchema);

module.exports = Tweet;

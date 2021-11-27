const mongoose = require("mongoose");

const zipSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  city: { type: String, default: "", required: true },
  state: { type: String, default: "", required: true },
  loc: {
    type: [Number],
  },
  pop: { type: Number, required: true, default: 0 },
});
const Zip = mongoose.model("zip", zipSchema);

module.exports = Zip;

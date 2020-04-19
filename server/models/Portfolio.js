const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const setStringType = (maxlength) => ({
  type: String,
  required: true,
  minlength: 5,
  maxlength: maxlength,
});
const portfolioSchema = new Schema({
  userId: setStringType(256),
  title: setStringType(256),
  company: setStringType(256),
  location: setStringType(128),
  position: setStringType(256),
  description: setStringType(2048),
  startDate: { type: Date, required: true },
  endDate: Date,
});

module.exports = mongoose.model("Portfolio", portfolioSchema);

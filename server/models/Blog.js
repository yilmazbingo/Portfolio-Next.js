const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//sparse will allow us to save more than one null values under uniqueness condition. Unique condition will not apply to null values.Slug is unique identificator for your blog. It is readable
const blogSchema = new Schema({
  userId: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  story: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }, //we assgin it when we update
  status: { type: String, default: "draft" },
  author: String,
});

module.exports = mongoose.model("Blog", blogSchema);

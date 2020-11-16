const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageShema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true }
});
const collectionName = "message";
module.exports = mongoose.model("message", messageShema, collectionName);
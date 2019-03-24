const mongoose = require("mongoose");
const Schema = mongoose.Schema;  
const moment = require("moment");
const now = moment();

const UserSchema = new mongoose.Schema({
  email: {type: String, unique: true, default: ""},
  password: {type: String, default: ""},
  posts: [{ type: Schema.Types.ObjectId, ref:'Post' }],
	timestamp: {type: String, default: now.format("dddd, MMMM Do YYYY, h:mm:ss a")}
});


module.exports = mongoose.model("User", UserSchema);

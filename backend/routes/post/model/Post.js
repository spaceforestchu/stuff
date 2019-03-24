const mongoose = require("mongoose");
const Schema = mongoose.Schema;  
const moment = require("moment");
const now = moment();

const PostSchema = new mongoose.Schema({
  post: {type: String, default: ""},
  user_id:{
    type:Schema.Types.ObjectId, ref:'User'
  },
  image: {type: String, default: ''},
  zipCode: {type: String, default: ''},
  zipCode_id: {type:Schema.Types.ObjectId, ref:'ZipCode'},
	timestamp: {type: String, default: now.format("dddd, MMMM Do YYYY, h:mm:ss a")}
});


module.exports = mongoose.model("Post", PostSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;  
const moment = require("moment");
const now = moment();

const ZipCodeSchema = new mongoose.Schema({
  zipCode: {type: String, default: ''},
  post_id: [{ type: Schema.Types.ObjectId, ref:'Post' }],
	timestamp: {type: String, default: now.format("dddd, MMMM Do YYYY, h:mm:ss a")}
});


module.exports = mongoose.model("ZipCode", ZipCodeSchema);

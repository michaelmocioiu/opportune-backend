const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  qualifications: { type: [String], required: true },
  work_type: { type: String, enum: ["remote", "hybrid", "onsite"], required: true },
  pay_type: { type: String, enum: ["hourly", "salary", "contract"], required: true },
  pay_amt: { type: Number, required: true },
  start_date: { type: Date },
  end_date: { type: Date },
  address: { type: String, required: true },
  tags: { type: [String] },
  prompts: {type: [String]},
  available: { type: Boolean, required: true },
  date_posted: { type: Date, default: Date.now },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  recruiters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

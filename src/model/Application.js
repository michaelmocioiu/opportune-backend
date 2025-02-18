const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  resume_url: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "declined"], required: true },
  date_created: { type: Date, default: Date.now },
  prompt_answers: { type: [String] },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;

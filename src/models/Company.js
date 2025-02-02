const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String },
  industry: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  business_registry_id: { type: String },
  CRA_BN: { type: String },
  managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  recruiters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);
module.exports = Company;

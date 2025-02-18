const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required:true },
    phone: { type: String, required: true, unique: true },
    type: {  type: String, enum: ["recruiter", "applicant", "admin", "manager"], required: true  },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
}, { timestamps: true });



module.exports = mongoose.model("User", userSchema);

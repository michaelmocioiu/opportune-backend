const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
    bio: { type: String },
    skills: {  type: [String] },
    experience: { type: [String] },
    resumes: { type: [String]},
    profile_photo : { type: String}
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
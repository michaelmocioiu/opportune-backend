const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    type: {  type: String, enum: ["recruiter", "applicant", "admin"], required: true  },
    password: { type: String, required:true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


module.exports = mongoose.model("User", userSchema);

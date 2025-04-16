// model/User.js
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: true,
        trim: true
    },
    last_name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: { 
        type: String, 
        required: true,
        minlength: [3, 'Password must be at least 3 characters long']
    },
    phone: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number']
    },
    type: { 
        type: String, 
        enum: ["recruiter", "applicant", "admin", "manager"], 
        required: true 
    },
    profile: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile'
    }
}, { 
    timestamps: true 
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
    const user = this;

    // Only hash the password if it has been modified or is new
    if (!user.isModified('password')) return next();

    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    pass_hash: { type: String, required: true },
    roles: {type: Array, required: false}
}, { timestamps: true });

module.exports = mongoose.model("Account", accountSchema);
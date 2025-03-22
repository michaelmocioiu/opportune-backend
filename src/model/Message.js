const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true  },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: {type: String, required: true}
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

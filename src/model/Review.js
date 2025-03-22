const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    position: {
        title: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date }
    },
    ratings: {
        managementQuality: { type: Number, required: true, min: 0, max: 5 },
        workplaceCulture: { type: Number, required: true, min: 0, max: 5 },
        growthPotential: { type: Number, required: true, min: 0, max: 5 }
    },
    pros: [{ type: String }],
    cons: [{ type: String }],
    additionalComments: { type: String }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review
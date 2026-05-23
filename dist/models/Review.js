"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    company: { type: mongoose_1.Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    reviewerName: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    likes: { type: Number, required: true, default: 0 },
    likedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true }
}, { _id: false });
const companySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    logoText: { type: String, required: true, trim: true, maxlength: 4 },
    logoColor: { type: String, required: true, default: "#09123a" },
    foundedOn: { type: Date, required: true },
    location: { type: locationSchema, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
companySchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "company"
});
exports.Company = (0, mongoose_1.model)("Company", companySchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const Company_1 = require("../models/Company");
const Review_1 = require("../models/Review");
const locations_1 = require("../data/locations");
const router = (0, express_1.Router)();
const companySchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    description: zod_1.z.string().min(10),
    logoText: zod_1.z.string().min(1).max(4),
    logoColor: zod_1.z.string().regex(/^#[0-9a-fA-F]{6}$/),
    foundedOn: zod_1.z.string().date(),
    location: zod_1.z.object({
        city: zod_1.z.string().min(1),
        state: zod_1.z.string().min(1),
        country: zod_1.z.string().min(1),
        address: zod_1.z.string().min(4)
    })
});
const serializeCompany = async (company) => {
    const reviews = await Review_1.Review.find({ company: company._id });
    const reviewCount = reviews.length;
    const averageRating = reviewCount
        ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount).toFixed(1))
        : 0;
    return {
        id: company._id,
        name: company.name,
        description: company.description,
        logoText: company.logoText,
        logoColor: company.logoColor,
        foundedOn: company.foundedOn,
        location: company.location,
        reviewCount,
        averageRating
    };
};
router.get("/", async (req, res, next) => {
    try {
        const search = String(req.query.search ?? "").trim();
        const city = String(req.query.city ?? "").trim();
        const state = String(req.query.state ?? "").trim();
        const country = String(req.query.country ?? "").trim();
        const sort = String(req.query.sort ?? "name");
        const filter = {};
        if (search)
            filter.$or = [{ name: new RegExp(search, "i") }, { description: new RegExp(search, "i") }];
        if (city)
            filter["location.city"] = city;
        if (state)
            filter["location.state"] = state;
        if (country)
            filter["location.country"] = country;
        const companies = await Company_1.Company.find(filter).sort(sort === "date" ? { foundedOn: -1 } : { name: 1 });
        const payload = await Promise.all(companies.map(serializeCompany));
        return res.json(payload);
    }
    catch (error) {
        return next(error);
    }
});
router.post("/", auth_1.requireAuth, async (req, res, next) => {
    try {
        const input = companySchema.parse(req.body);
        if (!(0, locations_1.isKnownLocation)(input.location.city, input.location.state, input.location.country)) {
            return res.status(422).json({ message: "Please select a verified city, state, and country." });
        }
        const company = await Company_1.Company.create({ ...input, foundedOn: new Date(input.foundedOn), createdBy: req.user?.id });
        return res.status(201).json(await serializeCompany(company));
    }
    catch (error) {
        return next(error);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const company = await Company_1.Company.findById(req.params.id);
        if (!company)
            return res.status(404).json({ message: "Company not found." });
        return res.json(await serializeCompany(company));
    }
    catch (error) {
        return next(error);
    }
});
exports.default = router;

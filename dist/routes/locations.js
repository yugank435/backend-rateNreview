"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locations_1 = require("../data/locations");
const router = (0, express_1.Router)();
router.get("/countries", (_req, res) => {
    res.json((0, locations_1.getCountries)());
});
router.get("/states", (req, res) => {
    const countryCode = String(req.query.countryCode ?? "");
    if (!countryCode)
        return res.status(400).json({ message: "countryCode is required." });
    return res.json((0, locations_1.getStates)(countryCode));
});
router.get("/cities", (req, res) => {
    const countryCode = String(req.query.countryCode ?? "");
    const stateCode = String(req.query.stateCode ?? "");
    if (!countryCode || !stateCode) {
        return res.status(400).json({ message: "countryCode and stateCode are required." });
    }
    return res.json((0, locations_1.getCities)(countryCode, stateCode));
});
exports.default = router;

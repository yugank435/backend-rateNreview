"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const config_1 = require("../config");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
const signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
const loginSchema = signupSchema.omit({ name: true });
const makeToken = (user) => jsonwebtoken_1.default.sign({ id: String(user._id), name: user.name, email: user.email }, config_1.config.jwtSecret, {
    expiresIn: config_1.config.jwtExpiresIn
});
router.post("/signup", async (req, res, next) => {
    try {
        const input = signupSchema.parse(req.body);
        const exists = await User_1.User.exists({ email: input.email.toLowerCase() });
        if (exists)
            return res.status(409).json({ message: "An account already exists for this email." });
        const user = await User_1.User.create({
            name: input.name,
            email: input.email,
            passwordHash: await bcryptjs_1.default.hash(input.password, 12)
        });
        return res.status(201).json({
            token: makeToken(user),
            user: { id: user._id, name: user.name, email: user.email },
            expiresIn: config_1.config.jwtExpiresIn
        });
    }
    catch (error) {
        return next(error);
    }
});
router.post("/login", async (req, res, next) => {
    try {
        const input = loginSchema.parse(req.body);
        const user = await User_1.User.findOne({ email: input.email.toLowerCase() });
        if (!user || !(await bcryptjs_1.default.compare(input.password, user.passwordHash))) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        return res.json({
            token: makeToken(user),
            user: { id: user._id, name: user.name, email: user.email },
            expiresIn: config_1.config.jwtExpiresIn
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.default = router;

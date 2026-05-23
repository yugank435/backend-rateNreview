"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const requireAuth = (req, res, next) => {
    const header = req.header("Authorization");
    const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
    if (!token)
        return res.status(401).json({ message: "Login is required for this action." });
    try {
        req.user = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        return next();
    }
    catch {
        return res.status(401).json({ message: "Your session has expired. Please login again." });
    }
};
exports.requireAuth = requireAuth;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const seed_1 = require("./seed");
mongoose_1.default
    .connect(config_1.config.mongoUri)
    .then(async () => {
    await (0, seed_1.seedDatabase)();
    console.log("Database seeded successfully.");
    await mongoose_1.default.disconnect();
})
    .catch((error) => {
    console.error("Database seeding failed", error);
    process.exit(1);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const zod_1 = require("zod");
const config_1 = require("./config");
const auth_1 = __importDefault(require("./routes/auth"));
const companies_1 = __importDefault(require("./routes/companies"));
const locations_1 = __importDefault(require("./routes/locations"));
const reviews_1 = __importDefault(require("./routes/reviews"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: config_1.config.clientOrigin, credentials: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", auth_1.default);
app.use("/api/companies", companies_1.default);
app.use("/api/reviews", reviews_1.default);
app.use("/api/locations", locations_1.default);
app.use((error, _req, res, _next) => {
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({ message: "Please check the submitted fields.", issues: error.issues });
    }
    console.error(error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
});
const startApi = () => {
    app.listen(config_1.config.port, () => {
        console.log(`API running on http://localhost:${config_1.config.port}`);
    });
};
mongoose_1.default
    .connect(config_1.config.mongoUri)
    .then(startApi)
    .catch(async (error) => {
    if (process.env.MONGO_URI) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
    console.warn("Local MongoDB was unavailable. Starting an in-memory MongoDB for development.");
    const memoryServer = await mongodb_memory_server_1.MongoMemoryServer.create({ instance: { launchTimeout: 60000 } });
    await mongoose_1.default.connect(memoryServer.getUri());
    app.listen(config_1.config.port, () => {
        console.log(`API running on http://localhost:${config_1.config.port}`);
    });
});

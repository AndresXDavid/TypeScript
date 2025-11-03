"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./config/db");
const users_1 = __importDefault(require("./routes/users"));
const types_1 = __importDefault(require("./routes/types"));
const instruments_1 = __importDefault(require("./routes/instruments"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API
app.use("/api/users", users_1.default);
app.use("/api/types", types_1.default);
app.use("/api/instruments", instruments_1.default);
// Servir archivos estáticos desde /public
const publicPath = path_1.default.join(__dirname, "..", "public");
app.use(express_1.default.static(publicPath));
// si ruta raíz, servir index.html
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(publicPath, "index.html"));
});
const PORT = process.env.PORT || 5500;
(0, db_1.connectDB)(process.env.MONGO_URI || "mongodb://localhost:27017/instruments")
    .then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server en http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error("No se pudo iniciar el servidor", err);
});

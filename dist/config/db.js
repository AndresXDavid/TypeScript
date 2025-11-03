"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB(uri) {
    if (!uri) {
        console.error("MONGO_URI no definido");
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(uri);
        console.log("MongoDB conectado");
    }
    catch (err) {
        console.error("Error conectando MongoDB", err);
        process.exit(1);
    }
}

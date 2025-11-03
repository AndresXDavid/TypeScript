"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InstrumentType_1 = __importDefault(require("../models/InstrumentType"));
const router = (0, express_1.Router)();
// GET /api/types
router.get("/", async (req, res) => {
    const types = await InstrumentType_1.default.find().lean();
    res.json(types);
});
// POST /api/types
router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name)
            return res.status(400).json({ msg: "El nombre es obligatorio" });
        const t = await InstrumentType_1.default.create({ name, description });
        res.status(201).json(t);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error interno" });
    }
});
// DELETE /api/types/:id
router.delete("/:id", async (req, res) => {
    try {
        await InstrumentType_1.default.findByIdAndDelete(req.params.id);
        res.json({ msg: "Tipo eliminado" });
    }
    catch {
        res.status(500).json({ msg: "Error al eliminar" });
    }
});
exports.default = router;
